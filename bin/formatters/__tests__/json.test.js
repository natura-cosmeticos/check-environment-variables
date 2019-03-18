describe('formatters:json', function () {
  const { expect } = require('chai')
  const json = require('../json')

  it('formats an object as pretty json', function () {
    const result = json({ anKeyString: 'a string', anKeyBool: true })
    expect(result).to.equal(`{
  "anKeyString": "a string",
  "anKeyBool": true
}`)
  })
})
