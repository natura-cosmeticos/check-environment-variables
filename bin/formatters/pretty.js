const dependencies = {
  chalk: require('chalk')
}

const ERRORS = {
  warning: {
    color: 'yellow',
    preffix: '⚠️'
  },
  error: {
    color: 'red',
    preffix: '⛔️'
  }
}

module.exports = function pretty (checkResult, { bail }, injection) {
  const { chalk } = Object.assign({}, dependencies, injection)

  return `The variables where checked:
  - ${checkResult.variables.map(mapVariables, { bail, chalk }).join('\n  - ')}`
}

function mapVariables (variableCheck) {
  const { bail, chalk } = this
  const errorConfiguration = bail ? ERRORS.error : ERRORS.warning
  const preffix = !variableCheck.error ? '✅' : errorConfiguration.preffix

  return `${preffix} ${variableCheck.variable}: ${printOkOrError(variableCheck, errorConfiguration, chalk)}`
}

function printOkOrError ({ error, value }, errorConfiguration, chalk) {
  if (!error) {
    return chalk.green(`OK! ${suffixOkMessage(value)}`)
  }

  return chalk[errorConfiguration.color](error)
}

function suffixOkMessage (value) {
  if (value === null) return 'This variable is not set.'

  return `Its value is: ${value}`
}
