class GithubAPIProviderMock {
  constructor({ fakeRepositories, fakeRateLimit, fakeSearchCode }) {
    this.fakeRepositories = fakeRepositories;
    this.fakeSearchCode = fakeSearchCode;
    this.fakeRateLimit = fakeRateLimit;
  }

  async getRepositoryByName(repositoryName) {
    const repository = this.fakeRepositories.find((r) => r.name === repositoryName);

    if (!repository) {
      // eslint-disable-next-line no-throw-literal
      throw { status: 404 };
    }

    return repository;
  }

  async getRateLimits() {
    return {
      resources: {
        search: this.fakeRateLimit.search,
      },
    };
  }

  async searchCodeWithQuery(query) {
    const [word] = query.split('+');
    const codeSearch = this.fakeSearchCode.find((code) => code.word === word);

    if (!codeSearch) {
      return { total_count: 0 };
    }

    return { total_count: 1 };
  }
}

module.exports = {
  GithubAPIProviderMock,
};
