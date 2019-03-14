#!/usr/bin/env node

const checkVariables = require('./bin/checkVariables')

const { executionSuccessfully } = checkVariables({
  argv: process.argv,
  environmentVariables: process.env,
  logger: console.log,
  currentDirectory: process.cwd()
})
process.exit(1 - (+executionSuccessfully))
