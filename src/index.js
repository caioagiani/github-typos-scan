const client = require("./lib/client");
const { enUs } = require("./utils/words-typos");

(async () => {
  const urlRepository = "https://github.com/CheetahTemplate3/cheetah3";

  await client.init();

  for (const word of enUs) {
    await client.github(urlRepository, word);
  }

  client.close();
})();
