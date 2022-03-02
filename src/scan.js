const { githubClient } = require('./lib/github');
const { enUs } = require('./utils/words-typos');

async function scanGithubRepository(repositoryName = '') {
  const client = githubClient();

  await client.init(repositoryName);

  for await (const word of enUs) {
    await client.scan(word);
  }
}

module.exports = {
  scanGithubRepository,
};
