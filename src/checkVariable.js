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

function invalidType(variableName, specification) {
  return { error: `Unrecognized type for variable ${variableName}: ${specification}`, invalid: true };
}

function nullWhenUndefined(variableValue) {
  return variableValue === undefined ? null : variableValue;
}

function createVariableCheck(variable, value, variableCheckResult) {
  return {
    variable,
    value,
    ...variableCheckResult,
  };
}

module.exports = function checkVariable([variableName, specification]) {
  const typeOfSpecification = typeof specification;

  if (!TYPES_OF_SPECIFICATION.includes(typeOfSpecification)) return invalidType(variableName, specification);

  const variableValue = nullWhenUndefined(this.environmentVariables[variableName]);

  if (typeOfSpecification === 'boolean') {
    const variableCheckResult = VARIABLE_CHECKER_BUILDERS.required(variableValue, { required: specification });

    return createVariableCheck(variableName, variableValue, variableCheckResult);
  }

  const VariableCheckerBuilder = VARIABLE_CHECKER_BUILDERS[specification.type || specification];

  if (!VariableCheckerBuilder) return invalidType(variableName, specification.type);

  const variableCheckResult = VariableCheckerBuilder(variableValue, { ...specification, variableName });

  return createVariableCheck(variableName, variableValue, variableCheckResult);
};
