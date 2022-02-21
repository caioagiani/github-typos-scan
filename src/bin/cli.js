#!/usr/bin/env node
const { program } = require('commander');
const packageJSON = require('../../package.json');
const { scanGithubRepository } = require('../scan');

program
  .name('github-typo-scan')
  .description('CLI to find typos in a Github Repository')
  .version(packageJSON.version)
  .option('-u, --url <char>', 'URL of the repository to scan')
  .parse();

const main = async () => {
  const { url } = program.opts();

  if (!url) {
    console.error(
      'No repository URL were provided. Please ensure to provide the --url option.',
    );
    return;
  }

  await scanGithubRepository(url);
};

main();
