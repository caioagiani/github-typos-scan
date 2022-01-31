const browser = require("./browser");
const githubSearch = require("./github");

module.exports = {
  browser: null,
  page: null,
  init: (options) => browser.launch(options),
  github: (url, word) => githubSearch(url, word),
  close: () => browser.close(),
};
