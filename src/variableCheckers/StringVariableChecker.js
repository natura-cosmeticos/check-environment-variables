const RequiredVariableChecker = require('./RequiredVariableChecker');

// eslint-disable-next-line complexity, max-lines-per-function, max-statements
module.exports = function StringVariableChecker(variableValue, {
  variableName, minLength = 1, maxLength = 65536, regex = null, required,
}) {
  if (typeof minLength !== 'number') {
    return { error: `The specification minLength of ${variableName} is not a number.`, invalid: true };
  }

  if (typeof maxLength !== 'number') {
    return { error: `The specification maxLength of ${variableName} is not a number.`, invalid: true };
  }

  const { error } = RequiredVariableChecker(variableValue, { required });

  if (error) return { error };

  if (variableValue === null) return { error: null };

  if (regex && !(new RegExp(regex).test(variableValue))) {
    return { error: StringVariableChecker.REGEX_ERROR };
  }

  const minLengthToApply = Math.max(minLength, 1);

  if (variableValue.length < minLengthToApply) {
    return { error: `The value is shorter than ${minLengthToApply} characters.` };
  }

  const maxLengthToApply = Math.min(maxLength, 65536);

  if (variableValue.length > maxLengthToApply) {
    return { error: `The value is longer than ${maxLengthToApply} characters.` };
  }

  return { error: null };
};

module.exports.REGEX_ERROR = 'The value does not match the specificied regex.';
