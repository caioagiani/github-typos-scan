const { scanGithubRepository } = require('./scan');

(async () => {
  const urlRepository = 'YOUR_GITHUB_URL_REPOSITORY';

  await scanGithubRepository(urlRepository);
})();
