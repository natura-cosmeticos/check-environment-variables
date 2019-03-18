describe('formatters:pretty', function () {
  const { expect } = require('chai')
  const { lorem } = require('faker')
  const pretty = require('../pretty')

  const fakeChalk = {
    green (text) { return text },
    red (text) { return text },
    yellow (text) { return text }
  }

  it('format ok variables', function () {
    const variable = lorem.word()
    const value = lorem.word()
    const variables = [{ variable, value, error: null }]

    const result = pretty({ variables }, { bail: false }, { chalk: fakeChalk })
    expect(result).to.equal(`The variables where checked:
  - ✅ ${variable}: OK! Its value is: ${value}`)
  })

  it('format ok variables with no values', function () {
    const variable = lorem.word()
    const variables = [{ variable, value: null, error: null }]

    const result = pretty({ variables }, { bail: true }, { chalk: fakeChalk })
    expect(result).to.equal(`The variables where checked:
  - ✅ ${variable}: OK! This variable is not set.`)
  })

  it('format error as warning when bail false', function () {
    const variable = lorem.word()
    const error = lorem.sentence()
    const variables = [{ variable, error }]

    const result = pretty({ variables }, { bail: false }, { chalk: fakeChalk })
    expect(result).to.equal(`The variables where checked:
  - ⚠️ ${variable}: ${error}`)
  })

  it('format error as error when bail true', function () {
    const variable = lorem.word()
    const error = lorem.sentence()
    const variables = [{ variable, error }]

    const result = pretty({ variables }, { bail: true }, { chalk: fakeChalk })
    expect(result).to.equal(`The variables where checked:
  - ⛔️ ${variable}: ${error}`)
  })
})
