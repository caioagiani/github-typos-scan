<!--
/*
 * Thanks for downloading this project, if you have any ideas, tweaks, etc...
 * fork the repository and create a Pull Request.
 */
-->

# Github Typos Scan

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/caioagiani/github-typos-scan">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/caioagiani/github-typos-scan">
<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/caioagiani/github-typos-scan">
<img alt="NPM downloads" src="https://img.shields.io/npm/dt/github-typos-scan?color=blue">
<img alt="GitHub license" src="https://img.shields.io/badge/license-GNU%20AGPL-blue.svg">

Simple tool to look for typos in github repositories

![screenshot-terminal-tools](.github/assets/terminal.png)

## Installation

```bash
# Download project
$ git clone git@github.com:caioagiani/github-typos-scan.git

# Join folder
$ cd github-typos-scan

# Install dependencies
$ yarn install or npm install

# Start application
$ yarn start or npm run start
```

## Usage

```js
(async () => {
  const urlRepository = "Github Repository"; // https://github.com/CheetahTemplate3/cheetah3

  await client.init();

  for (const word of enUs) {
    await client.github(urlRepository, word);
  }

  client.close();
})();
```

## License

Copyright © 2021 [caioagiani](https://github.com/caioagiani).<br />
Este projeto é licenciado [GNU AGPL](https://github.com/caioagiani/github-typos-scan/blob/master/LICENSE).
