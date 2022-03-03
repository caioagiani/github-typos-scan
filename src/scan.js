const { githubClient } = require('./lib/github');
const { enUs } = require('./utils/words-typos');

async function scanGithubRepository(repositoryName = '', personalAccessToken) {
  const client = githubClient();

  await client.init(repositoryName, personalAccessToken);

  for await (const word of enUs) {
    await client.scan(word);
  }
}

module.exports = {
  scanGithubRepository,
};
