const { request } = require('@octokit/request');
const { fgGreen, fgRed, reset } = require('../utils/color');
const { sleep } = require('../utils/sleep');

function githubClient() {
  let githubRepositoryName = '';
  let delayBetweenRequests = 0;

  const validateGithubRepositoryName = async (repositoryName = '') => {
    const result = await request(`GET /repos/${repositoryName}`).catch((err) => err.response);

    switch (result.status) {
      case 403:
        throw new Error('You don\'t have access to this repository.');
      case 404:
        throw new Error('Repository not found.');
      case 301:
        throw new Error('Repository moved permanently.');
      default:
    }
  };

  const init = async (repositoryName) => {
    await validateGithubRepositoryName(repositoryName);
    githubRepositoryName = repositoryName;
    const { data } = await request('GET /rate_limit');
    const { limit } = data.resources.search;

    delayBetweenRequests = Math.floor((60 * 1000) / limit);
    console.log(reset, '[!] Initializing scan...');
  };

  const scan = async (word) => {
    const query = `${word}+repo:${githubRepositoryName}`;

    const result = await request('GET /search/code', {
      q: query,
    });

    const color = result.data.total_count > 0 ? fgGreen : fgRed;

    console.log(color, `[${word.toUpperCase()}]: FOUND: ${result.data.total_count} - ${githubRepositoryName}`);

    await sleep(delayBetweenRequests);
  };

  return {
    init,
    scan,
  };
}

module.exports = {
  githubClient,
};
