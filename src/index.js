const { scanGithubRepository } = require('./scan');

(async () => {
  const repositoryName = 'YOUR_REPOSITORY_OWNER/YOUR_REPOSITORY_NAME';

  await scanGithubRepository(repositoryName);
})();
