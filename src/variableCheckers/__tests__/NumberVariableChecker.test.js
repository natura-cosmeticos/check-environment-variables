describe('variableCheckers:NumberVariableChecker', function () {
  const { expect } = require('chai')
  const NumberVariableChecker = require('../NumberVariableChecker')

  it('returns an error when variableValue is not an URL', function () {
    const { error } = NumberVariableChecker('an invalid number', { variableName: 'A_VARIABLE' })
    expect(error).to.equal('The value: "an invalid number" is not a valid number.')
  })

  it('returns error null when variableValue is an URL', function () {
    const { error } = NumberVariableChecker('+34.91', { variableName: 'A_VARIABLE' })
    expect(error).to.equal(null)
  })
})
