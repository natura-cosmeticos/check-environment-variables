describe('variableCheckers:UrlVariableChecker', function () {
  const { expect } = require('chai')
  const UrlVariableChecker = require('../UrlVariableChecker')

  it('returns an error when variableValue is not an URL', function () {
    const { error } = UrlVariableChecker('an invalid url', { variableName: 'A_VARIABLE' })
    expect(error).to.equal('The value: "an invalid url" is not a valid URL.')
  })

  it('returns error null when variableValue is an URL', function () {
    const { error } = UrlVariableChecker('http://urltest.com', { variableName: 'A_VARIABLE' })
    expect(error).to.equal(null)
  })
})
