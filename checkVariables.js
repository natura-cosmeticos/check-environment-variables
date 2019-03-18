#!/usr/bin/env node

const checkVariablesCommander = require('./bin/checkVariablesCommander');

const { executionSuccessfully } = checkVariablesCommander({
  argv: process.argv,
  currentDirectory: process.cwd(),
  environmentVariables: process.env,
  // eslint-disable-next-line no-console
  logger: console.log,
});

process.exit(1 - (+executionSuccessfully));
