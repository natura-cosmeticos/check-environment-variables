#!/usr/bin/env node

const checkVariablesCommander = require('./bin/checkVariablesCommander')

const { executionSuccessfully } = checkVariablesCommander({
  argv: process.argv,
  environmentVariables: process.env,
  logger: console.log,
  currentDirectory: process.cwd()
})
process.exit(1 - (+executionSuccessfully))
