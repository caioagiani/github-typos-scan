const client = require("./client");
const { fgGreen, fgRed } = require("../utils/color");

module.exports = async (repository, word) => {
  const url = `${repository}/search?q=${word}&type=code`;

  await client.page.goto(url, {
    waitUntil: "load",
    timeout: 0,
  });

  const countTypos = await client.page.evaluate(
    () => +document.querySelector('span[data-search-type="Code"]').innerHTML
  );

  const color = countTypos > 0 ? fgGreen : fgRed;

  console.log(color, `[${word.toUpperCase()}]: FOUND: ${countTypos} - ${url}`);

  await client.page.waitForTimeout(6500);
};
