const { fgGreen, fgRed, reset } = require('../utils/color');
const { sleep } = require('../utils/sleep');
const { GithubAPIProvider } = require('../providers/github-api-provider');

function githubClient() {
  let githubRepositoryName = '';
  let delayBetweenRequests = 0;
  let githubAPIProvider;

  const useCustomGithubProvider = (apiProvider) => {
    githubAPIProvider = apiProvider;
  };

  const validateGithubRepositoryName = async (repositoryName = '') => {
    try {
      await githubAPIProvider.getRepositoryByName(repositoryName);
    } catch (error) {
      switch (error.status) {
        case 403:
          throw new Error('You don\'t have access to this repository.');
        case 404:
          throw new Error('Repository not found.');
        case 301:
          throw new Error('Repository moved permanently.');
        default:
          throw error;
      }
    }
  };

  const init = async (repositoryName, personalAccessToken) => {
    if (!githubAPIProvider) {
      githubAPIProvider = new GithubAPIProvider(personalAccessToken);
    }

    await validateGithubRepositoryName(repositoryName);
    githubRepositoryName = repositoryName;
    const rateLimits = await githubAPIProvider.getRateLimits();
    const { limit } = rateLimits.resources.search;

    delayBetweenRequests = Math.floor((60 * 1000) / limit);
    console.log(reset, '[!] Initializing scan...');
  };

  const scan = async (word) => {
    const query = `${word}+repo:${githubRepositoryName}`;

    const searchCodeResults = await githubAPIProvider.searchCodeWithQuery(query);

    const color = searchCodeResults.total_count > 0 ? fgGreen : fgRed;

    console.log(color, `[${word.toUpperCase()}]: FOUND: ${searchCodeResults.total_count} - ${githubRepositoryName}`);

    await sleep(delayBetweenRequests);

    if (searchCodeResults.total_count > 0) return true;

    return false;
  };

  return {
    init,
    scan,
    useCustomGithubProvider,
  };
}

module.exports = {
  githubClient,
};
