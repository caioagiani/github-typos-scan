<!--
/*
 * Thanks for downloading this project, if you have any ideas, tweaks, etc...
 * fork the repository and create a Pull Request.
 */
-->

# Github Typos Scan

<div align="left">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/caioagiani/github-typos-scan">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/caioagiani/github-typos-scan">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/caioagiani/github-typos-scan">
  <img alt="GitHub license" src="https://img.shields.io/badge/license-GNU%20AGPL-blue.svg">
</div>

<h3 align="left">Simple tool to look for typos in github repositories</h3>

![screenshot-terminal-tools](https://github.com/caioagiani/github-typos-scan/blob/main/.github/assets/terminal.png)

## Installation

```bash
# Download project
$ git clone git@github.com:caioagiani/github-typos-scan.git

# Join folder
$ cd github-typos-scan

# Install dependencies
$ npm install
```

## Usage

### As a CLI application:

```bash
$ npm install -g github-typos-scan

$ github-typos-scan --url https://github.com/caioagiani/github-typos-scan
```

### As a NodeJS application:

- Follow the [Installation](#installation) process;
- Replace the line that says `YOUR_GITHUB_URL_REPOSITORY` at [src/index.js](./src/index.js) with the url of a given repository you want to scan;
- Run `npm run start`.

Example:

```js
(async () => {
  const urlRepository = "https://github.com/CheetahTemplate3/cheetah3";

  await scanGithubRepository(urlRepository);
})();
```

## Development

```bash
# Download project
$ git clone git@github.com:caioagiani/github-typos-scan.git

# Join folder
$ cd github-typos-scan

# Install dependencies
$ npm install

# Install this app as a global module
$ npm install -g .

# Run the app
$ github-typos-scan --url https://github.com/caioagiani/github-typos-scan
```

## License

Copyright © 2022 [caioagiani](https://github.com/caioagiani).<br />
Este projeto é licenciado [GNU AGPL](https://github.com/caioagiani/github-typos-scan/blob/master/LICENSE).
