const StringVariableChecker = require('./StringVariableChecker')

module.exports = function RegexVariableCheckerCreator (regex, suffix) {
  return function RegexVariableChecker (variableValue, { variableName }) {
    const result = StringVariableChecker(variableValue, { variableName, regex })

    if (result.error !== StringVariableChecker.REGEX_ERROR) return result

    return { error: `The value: "${variableValue}" is not a valid ${suffix}.` }
  }
}
