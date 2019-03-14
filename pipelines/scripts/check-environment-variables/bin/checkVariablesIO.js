const fs = require('fs')
const chalk = require('chalk')
const YAML = require('yaml')

const checkVariables = require('../src/checkVariables')

module.exports = function checkVariablesIO ({ yamlFile, environmentVariables, logger, bail, formatterName }) {
	const specYamlFile = fs.readFileSync(yamlFile, 'utf8')
	const checkVariablesSpec = YAML.parse(specYamlFile).checkVariables

	const checkResult = checkVariables(environmentVariables, checkVariablesSpec)

  if (!checkResult.success) {
    logger(`❌ Some errors has happened: \n${chalk.red(checkResult.messages.map(printError))}`)
    return {
      ...checkResult,
      executionSuccessfully: false
    }
  }

  const formatter = require(`./formatters/${formatterName}`)
  logger(formatter(checkResult, { bail }))

  return {
    ...checkResult,
    executionSuccessfully: !bail || !checkResult.hasErrors
  }
}

function printError (message) {
  return `  - ${message}`
}