const { request } = require('@octokit/request');

class GithubAPIProvider {
  constructor(personalAccessToken) {
    if (personalAccessToken) {
      this.request = request.defaults({
        headers: {
          authorization: `token ${personalAccessToken}`,
        },
      });
    } else {
      this.request = request.defaults();
    }
  }

  async getRepositoryByName(repositoryName) {
    const result = await this.request(`GET /repos/${repositoryName}`);

    return result.data;
  }

  async getRateLimits() {
    const result = await this.request('GET /rate_limit');

    return result.data;
  }

  async searchCodeWithQuery(query) {
    const result = await this.request('GET /search/code', {
      q: query,
    });

    return result.data;
  }
}

module.exports = {
  GithubAPIProvider,
};
