const RequiredVariableChecker = require('./RequiredVariableChecker');

module.exports = function BooleanVariableChecker(variableValue, { required }) {
  const { error } = RequiredVariableChecker(variableValue, { required });

  if (error) return { error };

  if (variableValue === null) return { error: null };

  if (/^true|false$/.test(variableValue)) return { error: null };

  return { error: `The value: "${variableValue}" is not a valid boolean.` };
};
