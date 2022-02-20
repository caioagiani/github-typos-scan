const puppeteer = require('puppeteer');

function createBrowserInstance() {
  let browser = null;
  let page = null;

  const launch = async (options) => {
    const browserLaunched = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      ...options,
    });

    const pageCreated = await browserLaunched.newPage();

    browser = browserLaunched;
    page = pageCreated;
  };

  const navigateToUrl = async (
    url,
    options = {
      waitUntil: 'load',
      timeout: 0,
    },
  ) => page.goto(url, options);

  const evaluate = async (functionToBeEvaluatedInPage) => page
    .evaluate(functionToBeEvaluatedInPage);

  const wait = async (timeoutInMilliseconds) => page.waitForTimeout(timeoutInMilliseconds);

  const close = async () => {
    if (!browser) return;
    await browser.close();
    browser = null;
    page = null;
  };

  return {
    close,
    evaluate,
    launch,
    navigateToUrl,
    wait,
  };
}

module.exports = {
  createBrowserInstance,
};
