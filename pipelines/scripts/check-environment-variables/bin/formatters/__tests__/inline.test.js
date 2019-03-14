describe('formatters:inline', function () {
  const { expect } = require('chai')
  const inline = require('../inline')

  it('formats an object as json inline', function () {
    const result = inline({ anKeyString: 'a string', anKeyBool: true })
    expect(result).to.equal('{"anKeyString":"a string","anKeyBool":true}')
  })
})
