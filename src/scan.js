const { githubClient } = require('./lib/github');
const { enUs } = require('./utils/words-typos');

async function scanGithubRepository(repositoryUrl = '') {
  const client = githubClient();

  await client.init(repositoryUrl);

  for await (const word of enUs) {
    await client.scan(word);
  }

  await client.close();
}

module.exports = {
  scanGithubRepository,
};
