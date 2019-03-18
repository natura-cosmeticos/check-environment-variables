module.exports = function EnumVariableChecker(variableValue, { variableName, possibleValues }) {
  if (!Array.isArray(possibleValues)) {
    return { error: `The specification possibleValues of ${variableName} is not an array.`, invalid: true };
  }

  if (!possibleValues.includes(variableValue)) {
    return { error: `The value: "${variableValue}" does not match possible values (${possibleValues.join(',')}).` };
  }

  return { error: null };
};
