const assert = require('assert');
const checkVariable = require('./checkVariable');

function invalidVariableChecker({ invalid }) {
  return Boolean(invalid);
}

function getError({ error }) {
  return error;
}

function createVariableCheckReturnForInvalidSpecification(invalidCheckers) {
  const messages = invalidCheckers.map(getError);

  return {
    assertVariablesAreOk: assert.fail.bind(assert, messages.join(', ')),
    messages,
    success: false,
  };
}

function getErrorForVariableCheck(variableCheck) {
  return `- ${variableCheck.variable}: ${getError(variableCheck)};`;
}

function createVariableCheckReturnWhenSpecificationIsValid(variablesCheckers) {
  const variablesCheckersWithError = variablesCheckers.filter(getError);
  const hasErrors = variablesCheckersWithError.length > 0;

  return {
    assertVariablesAreOk: assert.ok.bind(
      assert,
      !hasErrors,
      `Some variables doesn't follow the specification:\n${variablesCheckers.map(getErrorForVariableCheck).join('\n')}`,
    ),
    hasErrors,
    success: true,
    variables: variablesCheckers,
  };
}

module.exports = function checkVariables(environmentVariables, checkVariablesSpecification) {
  const variablesCheckers = Object.entries(checkVariablesSpecification).map(checkVariable, { environmentVariables });

  const invalidCheckers = variablesCheckers.filter(invalidVariableChecker);

  if (invalidCheckers.length) return createVariableCheckReturnForInvalidSpecification(invalidCheckers);

  return createVariableCheckReturnWhenSpecificationIsValid(variablesCheckers);
};
