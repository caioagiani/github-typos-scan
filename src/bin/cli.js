#!/usr/bin/env node
const { program } = require('commander');
const packageJSON = require('../../package.json');
const { scanGithubRepository } = require('../scan');

program
  .name('github-typos-scan')
  .description('CLI to find typos in a Github Repository')
  .version(packageJSON.version)
  .usage('-n <name>')
  .option('-n, --name <char>', 'name of the repository to scan')
  .parse(process.argv);

(async () => {
  const { name } = program.opts();

  if (!name) {
    console.error(
      'No repository name were provided. Please ensure to provide the --name option.',
    );

    return;
  }

  await scanGithubRepository(name);
})();
