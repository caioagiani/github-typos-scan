const { githubClient } = require('../../src/lib/github');
const { GithubAPIProviderMock } = require('../mock/github-api-provider-mock');

let githubAPIProviderMock;
let github;
describe('Github', () => {
  beforeAll(async () => {
    githubAPIProviderMock = new GithubAPIProviderMock({
      fakeRepositories: [
        {
          name: 'fakeownername/fakerepositoryname',
        },
      ],
      fakeSearchCode: [
        {
          word: 'misspelled-word',
        },
      ],
      fakeRateLimit: {
        search: 60,
      },
    });

    github = githubClient();
    github.useCustomGithubProvider(githubAPIProviderMock);
  });

  it('should throw an error of repository not found', async () => {
    await expect(async () => {
      await github.init('notfoundrepo/notfoundrepo');
    }).rejects.toEqual(new Error('Repository not found.'));
  });

  it('should return true because of a misspelled-word', async () => {
    await github.init('fakeownername/fakerepositoryname');
    const sut = await github.scan('misspelled-word');

    expect(sut).toEqual(true);
  });

  it("should return false because there isn't a misspelled-word", async () => {
    await github.init('fakeownername/fakerepositoryname');
    const sut = await github.scan('some-word');

    expect(sut).toEqual(false);
  });
});
