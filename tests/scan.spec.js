const { scanGithubRepository: sut } = require('../src/scan');

describe('Scan', () => {
  it('Should throw if called with a url that is not from a Github Repository', async () => {
    const scanParam = 'https://invalid.url/github-typos-scan';

    const promise = () => sut(scanParam);

    await expect(promise).rejects.toThrow();
  });

  it('Should throw if called with a incomplete url', async () => {
    const scanParam = 'https://github.com/caioagiani/';

    const promise = () => sut(scanParam);

    await expect(promise).rejects.toThrow();
  });
});
