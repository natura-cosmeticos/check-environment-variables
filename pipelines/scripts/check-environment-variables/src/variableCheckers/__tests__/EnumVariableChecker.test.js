describe('variableCheckers:EnumVariableChecker', function () {
  const { expect } = require('chai')
  const { lorem } = require('faker')
  const EnumVariableChecker = require('../EnumVariableChecker')

  it('returns no error when the variableValue is included on possibleValues', function () {
    const variableValue = 'included'
    const { error } = EnumVariableChecker(variableValue, {
      variableName: 'A_VARIABLE',
      possibleValues: ['included', 'also included']
    })
    expect(error).to.equal(null)
  })

  it('returns an error when the variableValue is NOT include on possibleValues', function () {
    const variableValue = lorem.word()
    const { error } = EnumVariableChecker(variableValue, {
      variableName: 'A_VARIABLE',
      possibleValues: ['included', 'also included']
    })
    expect(error).to.equal(`The value: "${variableValue}" does not match possible values (included,also included).`)
  })

  it('returns as invalid when possibleValues is not an array', function () {
    const possibleValues = { fake: 'array', includes: true }
    const { invalid, error } = EnumVariableChecker('does not matter', { variableName: 'SHELL', possibleValues })
    expect(invalid).to.equal(true)
    expect(error).to.equal('The specification possibleValues of SHELL is not an array.')
  })
})
