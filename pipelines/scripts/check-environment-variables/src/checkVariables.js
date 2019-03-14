const VARIABLE_CHECKER_BUILDERS = {
  string: require('./variableCheckers/StringVariableChecker'),
  email: require('./variableCheckers/EmailVariableChecker'),
  boolean: require('./variableCheckers/BooleanVariableChecker'),
  number: require('./variableCheckers/NumberVariableChecker'),
  url: require('./variableCheckers/UrlVariableChecker'),
  required: require('./variableCheckers/RequiredVariableChecker')
}

const TYPES_OF_SPECIFICATION = ['boolean', 'object', 'string']

module.exports = function checkVariables (environmentVariables, checkVariablesSpec) {
  const variablesCheckers = Object.entries(checkVariablesSpec)
    .map(transformKeyValueInVariableChecker, { environmentVariables })

  const invalidCheckers = variablesCheckers.filter(invalidVariableChecker)
  if (invalidCheckers.length) {
    return {
      success: false,
      messages: invalidCheckers.map(getError)
    }
  }

  const hasErrors = variablesCheckers.some(getError)

  return { success: true, hasErrors, variables: variablesCheckers }
}

function transformKeyValueInVariableChecker ([variableName, specification]) {
  const typeOfSpecification = typeof specification

  if (!TYPES_OF_SPECIFICATION.includes(typeOfSpecification)) return invalidType(variableName, specification)

  const variableValue = this.environmentVariables[variableName] === undefined ? null : this.environmentVariables[variableName]

  if (typeOfSpecification === 'boolean') {
    return {
      variable: variableName,
      value: variableValue,
      ...VARIABLE_CHECKER_BUILDERS.required(variableValue, { required: specification })
    }
  }

  const VariableCheckerBuilder = VARIABLE_CHECKER_BUILDERS[specification.type || specification]

  if (!VariableCheckerBuilder) return invalidType(variableName, specification.type)

  return {
    variable: variableName,
    value: variableValue,
    ...VariableCheckerBuilder(variableValue, { ...specification, variableName })
  }
}

function invalidVariableChecker ({ invalid }) {
  return Boolean(invalid)
}

function getError ({ error }) {
  return error
}

function invalidType (variableName, specification) {
  return { invalid: true, error: `Unrecognized type for variable ${variableName}: ${specification}` }
}
