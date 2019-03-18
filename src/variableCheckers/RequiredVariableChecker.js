module.exports = function RequiredVariableChecker(variableValue, { required }) {
  if (!required || variableValue) return { error: null };

  return { error: 'The variable is not defined on the environment.' };
};
