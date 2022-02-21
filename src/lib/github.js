const { fgGreen, fgRed, reset } = require('../utils/color');
const { createBrowserInstance } = require('./browser');

const validGithubRepositoryUrlRegex = /https:\/\/(www\.)?github\.com\/.*\/.+/;

function githubClient() {
  const browserInstance = createBrowserInstance();
  let githubRepositoryUrl = '';

  const validateUrl = (url) => {
    const isValid = validGithubRepositoryUrlRegex.test(url);

    if (!isValid) {
      throw new Error('This URL is not from a Github Repository');
    }
  };

  const init = async (repositoryUrl) => {
    githubRepositoryUrl = repositoryUrl;
    validateUrl(repositoryUrl);
    console.log(reset, '[!] Initializing scan...');
    await browserInstance.launch();
  };

  const scan = async (word) => {
    const url = `${githubRepositoryUrl}/search?q=${word}&type=code`;

    await browserInstance.navigateToUrl(url);

    const countTypos = await browserInstance.evaluate(
      () => +document.querySelector('span[data-search-type="Code"]').innerHTML,
    );

    const color = countTypos > 0 ? fgGreen : fgRed;

    console.log(
      color,
      `[${word.toUpperCase()}]: FOUND: ${countTypos} - ${url}`,
    );

    await browserInstance.wait(6500);
  };

  const close = async () => {
    console.log(reset, '[!] Closing session...');
    await browserInstance.close();
  };

  return {
    init,
    scan,
    close,
    validateUrl,
  };
}

module.exports = {
  githubClient,
};
