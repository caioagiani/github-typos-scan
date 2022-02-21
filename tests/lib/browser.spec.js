const { mockPuppeteer } = require('../mock/mock-puppeteer');
const browser = require('../../src/lib/browser');

jest.mock('puppeteer', () => mockPuppeteer);

describe('Browser', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    mockPuppeteer.launch.mockClear();
    mockPuppeteer.launch().newPage.mockClear();
    mockPuppeteer.launch().close.mockClear();
  });

  it('Should not call puppeteer if launch were not called', () => {
    const sut = browser.createBrowserInstance();

    const launchSpy = jest.spyOn(sut, 'launch');

    expect(launchSpy).not.toBeCalled();
  });

  describe('launch()', () => {
    it('Should call puppeteer with correct params', async () => {
      const sut = browser.createBrowserInstance();

      await sut.launch();

      expect(mockPuppeteer.launch).toBeCalledWith({
        args: ['--no-sandbox'],
        headless: true,
      });
      expect(mockPuppeteer.launch().newPage).toBeCalled();
    });
  });

  describe('navigateToUrl()', () => {
    it('Should call page.goto() with correct params', async () => {
      const sut = browser.createBrowserInstance();

      const navigateToUrlParams = {
        url: 'https://example.com',
      };

      await sut.launch();
      await sut.navigateToUrl(navigateToUrlParams.url);

      expect(mockPuppeteer.launch().newPage().goto).toBeCalledWith(
        navigateToUrlParams.url,
        { timeout: 0, waitUntil: 'load' },
      );
    });
  });

  describe('evaluate()', () => {
    it('Should call page.evaluate() with correct param', async () => {
      const sut = browser.createBrowserInstance();

      const evaluateParam = () => undefined;

      await sut.launch();
      await sut.evaluate(evaluateParam);

      expect(mockPuppeteer.launch().newPage().evaluate).toBeCalledWith(
        evaluateParam,
      );
    });
  });

  describe('wait()', () => {
    it('Should call page.waitForTimeout() with correct param', async () => {
      const sut = browser.createBrowserInstance();

      const twoSecondsInMilliseconds = 2 * 1000;
      const waitParam = twoSecondsInMilliseconds;

      await sut.launch();
      await sut.wait(waitParam);

      expect(mockPuppeteer.launch().newPage().waitForTimeout).toBeCalledWith(
        waitParam,
      );
    });
  });

  describe('close()', () => {
    it('Should call browser.close() with correct param', async () => {
      const sut = browser.createBrowserInstance();

      await sut.launch();
      await sut.close();

      expect(mockPuppeteer.launch().close).toBeCalledTimes(1);
    });

    it('Should not call browser.close() twice', async () => {
      const sut = browser.createBrowserInstance();

      await sut.launch();
      await sut.close();
      await sut.close();
      await sut.close();
      await sut.close();

      expect(mockPuppeteer.launch().close).toBeCalledTimes(1);
    });
  });
});
