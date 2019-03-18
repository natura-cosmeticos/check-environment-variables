const path = require('path')

const commander = require('commander')

const { version } = require('../package.json')
const checkVariablesIO = require('./checkVariablesIO')

commander
  .version(version)
  .option('-b, --bail', 'It exit the process with status non ok when an variables is wrong')
  .option('-f, --formatter [formatter]', 'The formatter of output: json, inline, pretty', /^json|inline|pretty/iu, 'pretty')
  .usage('[options] [yamlFile]')

module.exports = function checkVariablesCommander ({ argv, environmentVariables, logger, currentDirectory }) {
  commander.parse(argv)

  const {
    bail,
    formatter: formatterName
  } = commander

  const yamlFile = commander.args[0] || path.join(currentDirectory, 'checkVariablesSpec.yaml')

  return checkVariablesIO({ yamlFile, environmentVariables, logger, bail, formatterName })
}
