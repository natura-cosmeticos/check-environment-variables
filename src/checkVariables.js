const VARIABLE_CHECKER_BUILDERS = {
  boolean: require('./variableCheckers/BooleanVariableChecker'),
  email: require('./variableCheckers/EmailVariableChecker'),
  enum: require('./variableCheckers/EnumVariableChecker'),
  number: require('./variableCheckers/NumberVariableChecker'),
  required: require('./variableCheckers/RequiredVariableChecker'),
  string: require('./variableCheckers/StringVariableChecker'),
  url: require('./variableCheckers/UrlVariableChecker'),
};

const TYPES_OF_SPECIFICATION = ['boolean', 'object', 'string'];

function invalidVariableChecker({ invalid }) {
  return Boolean(invalid);
}

function getError({ error }) {
  return error;
}

function invalidType(variableName, specification) {
  return { error: `Unrecognized type for variable ${variableName}: ${specification}`, invalid: true };
}

// eslint-disable-next-line complexity, max-lines-per-function
function transformKeyValueInVariableChecker([variableName, specification]) {
  const typeOfSpecification = typeof specification;

  // eslint-disable-next-line max-len
  if (!TYPES_OF_SPECIFICATION.includes(typeOfSpecification)) return invalidType(variableName, specification);

  // eslint-disable-next-line max-len
  const variableValue = this.environmentVariables[variableName] === undefined ? null : this.environmentVariables[variableName];

  if (typeOfSpecification === 'boolean') {
    return {
      variable: variableName,
      value: variableValue,
      ...VARIABLE_CHECKER_BUILDERS.required(variableValue, { required: specification }),
    };
  }

  const VariableCheckerBuilder = VARIABLE_CHECKER_BUILDERS[specification.type || specification];

  if (!VariableCheckerBuilder) return invalidType(variableName, specification.type);

  return {
    variable: variableName,
    value: variableValue,
    ...VariableCheckerBuilder(variableValue, { ...specification, variableName }),
  };
}

module.exports = function checkVariables(environmentVariables, checkVariablesSpec) {
  const variablesCheckers = Object.entries(checkVariablesSpec)
    .map(transformKeyValueInVariableChecker, { environmentVariables });

  const invalidCheckers = variablesCheckers.filter(invalidVariableChecker);

  if (invalidCheckers.length) {
    return {
      messages: invalidCheckers.map(getError),
      success: false,
    };
  }

  const hasErrors = variablesCheckers.some(getError);

  return { hasErrors, success: true, variables: variablesCheckers };
};
