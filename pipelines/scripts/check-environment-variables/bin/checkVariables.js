const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const commander = require('commander')
const YAML = require('yaml')

const { version } = require('../package.json')

const checkVariables = require('../src/checkVariables')

commander
  .version(version)
  .option('-b, --bail', 'It exit the process with status non ok when an variables is wrong')
  .option('-f, --formatter [formatter]', 'The formatter of output: json, inline, pretty', /^json|inline|pretty/iu, 'pretty')
  .usage('[options] [yamlFile]')

module.exports = function executeCheckVariables ({ argv, environmentVariables, logger, currentDirectory }) {
  commander.parse(argv)

  const {
    bail,
    formatter: formatterName
  } = commander

  const yamlFile = commander.args[0] || path.join(currentDirectory, 'checkVariablesSpec.yaml')

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
