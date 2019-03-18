describe('variableCheckers:BooleanVariableChecker', function () {
  const { expect } = require('chai')
  const BooleanVariableChecker = require('../BooleanVariableChecker')

  it('returns an error when variableValue is not an boolean', function () {
    const { error } = BooleanVariableChecker('an invalid boolean', { variableName: 'A_VARIABLE' })
    expect(error).to.equal('The value: "an invalid boolean" is not a valid boolean.')
  })

  it('returns error null when variableValue is an true', function () {
    const { error } = BooleanVariableChecker('true', { variableName: 'A_VARIABLE' })
    expect(error).to.equal(null)
  })

  it('returns error null when variableValue is an false', function () {
    const { error } = BooleanVariableChecker('false', { variableName: 'A_VARIABLE' })
    expect(error).to.equal(null)
  })

  it('returns error null when variableValue is null and it is not required', function () {
    const { error } = BooleanVariableChecker(null, { variableName: 'A_VARIABLE' })
    expect(error).to.equal(null)
  })

  it('returns an error when variableValue is required, but it is not sent', function () {
    const { error } = BooleanVariableChecker(null, { variableName: 'A_VARIABLE', required: true })
    expect(error).to.equal('The variable is not defined on the environment.')
  })

  it('returns an error when variableValue is not an boolean', function () {
    const { error } = BooleanVariableChecker('an invalid boolean', { variableName: 'A_VARIABLE' })
    expect(error).to.equal('The value: "an invalid boolean" is not a valid boolean.')
  })
})
