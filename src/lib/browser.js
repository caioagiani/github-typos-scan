const puppeteer = require("puppeteer");
const client = require("./client");
const { reset } = require("../utils/color");

module.exports = {
  launch: async (options) => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
      ...options,
    });

    console.log(reset, "[!] Initializing scan...");

    const page = await browser.newPage();

    client.browser = browser;
    client.page = page;
  },
  close: () => {
    console.log(reset, "[!] Closing session...");

    return client.browser.close();
  },
};
