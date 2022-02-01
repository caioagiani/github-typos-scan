const client = require("./lib/client");
const { enUs } = require("./utils/words-typos");

(async () => {
  const urlRepository = "YOUR_GITHUB_URL_REPOSITORY";

  await client.init();

  for (const word of enUs) {
    await client.github(urlRepository, word);
  }

  client.close();
})();
