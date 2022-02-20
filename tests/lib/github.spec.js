const { mockPuppeteer } = require('../mock/mock-puppeteer');
const { githubClient } = require('../../src/lib/github');
const browser = require('../../src/lib/browser');

jest.mock('puppeteer', () => mockPuppeteer);
jest.mock('../../src/lib/browser');

describe('Github', () => {
  const browserSpy = {
    launch: jest.fn(),
    navigateToUrl: jest.fn(),
    evaluate: jest.fn((callback) => callback()),
    wait: jest.fn(),
    close: jest.fn(),
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest
      .spyOn(browser, 'createBrowserInstance')
      .mockImplementation(() => browserSpy);
  });

  it('Should call browser with correct params', async () => {
    const querySelectorSpy = jest
      .spyOn(document, 'querySelector')
      .mockReturnValueOnce({
        innerHTML: '0',
      });
    const logSpy = jest.spyOn(console, 'log');

    const params = {
      repositoryUrl: 'https://github.com/caioagiani/github-typos-scan',
      word: 'evaluated',
    };

    const sut = githubClient();

    await sut.init(params.repositoryUrl);
    await sut.scan(params.word);
    await sut.close();

    expect(browserSpy.launch).toBeCalledTimes(1);
    expect(browserSpy.navigateToUrl).toBeCalledWith(
      `${params.repositoryUrl}/search?q=${params.word}&type=code`,
    );
    expect(querySelectorSpy).toBeCalledWith('span[data-search-type="Code"]');
    expect(logSpy).toBeCalledWith(
      expect.anything(),
      '[EVALUATED]: FOUND: 0 - https://github.com/caioagiani/github-typos-scan/search?q=evaluated&type=code',
    );
    expect(browserSpy.wait).toBeCalledWith(6500);
    expect(browserSpy.close).toBeCalledTimes(1);
  });
});
