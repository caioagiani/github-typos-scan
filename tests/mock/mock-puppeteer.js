const mockPuppeteerNewPage = {
  evaluate: jest.fn(),
  goto: jest.fn().mockResolvedValue(),
  waitForTimeout: jest.fn().mockResolvedValue(undefined),
};

const mockPuppeteerLaunch = {
  newPage: jest.fn(() => mockPuppeteerNewPage),
  close: jest.fn().mockResolvedValue(undefined),
};

const mockPuppeteer = {
  launch: jest.fn(() => mockPuppeteerLaunch),
};

module.exports = {
  mockPuppeteer,
  mockPuppeteerLaunch,
  mockPuppeteerNewPage,
};
