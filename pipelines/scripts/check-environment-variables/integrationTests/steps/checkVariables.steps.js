const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const path = require('path')

const SPEC_FILES_FOLDER = 'specFiles'

const checkVariables = require('../../bin/checkVariables')

Given('an environment', function () {
  this.environmentVariables = {
    SHELL: '/bin/zsh',
    OTHER_REQUIRED_STRING: 'an value'
  }
})

When('I check the variables', function () {
  const { environmentVariables } = this
  const currentDirectory = path.join(__dirname, SPEC_FILES_FOLDER)

  this.result = checkVariables({
    argv: ['node', 'check-variables'],
    environmentVariables,
    logger () {},
    currentDirectory
  })
})

Then('It validates the environment variables', function () {
  expect(this.result).to.deep.equal({
    executionSuccessfully: true,
    hasErrors: false,
    success: true,
    variables: [{
      error: null,
      value: '/bin/zsh',
      variable: 'SHELL'
    }, {
      error: null,
      value: 'an value',
      variable: 'OTHER_REQUIRED_STRING'
    }]
  })
})

Given('a environment with required variables and a missing variable', function () {
  this.environmentVariables = {
    SHELL: '/bin/zsh',
    OTHER_REQUIRED_STRING: 'an value'
  }
})

Given('a spec saying that I need the variable', function () {
  this.specYamlFile = path.join(__dirname, SPEC_FILES_FOLDER, 'requiredVariables.spec.yaml')
})

function includeBail (argv, bail) {
  if (!bail) return argv

  return [...argv, '-b']
}

When('I check those variables', function () {
  const { environmentVariables, specYamlFile } = this
  const currentDirectory = __dirname

  this.result = checkVariables({
    argv: includeBail(['node', 'check-variables', specYamlFile], Boolean(this.formatter)),
    environmentVariables,
    logger () {},
    currentDirectory
  })
})

Then('It says that the environment miss the variable necessary', function () {
  expect(this.result.success).to.equal(true)
  expect(this.result.hasErrors).to.equal(true)

  const [SHELL, A_MISSING_REQUIRED_URL, OTHER_REQUIRED_STRING] = this.result.variables

  expect(SHELL).to.have.property('variable', 'SHELL')
  expect(SHELL).to.have.property('value', '/bin/zsh')
  expect(SHELL).to.have.property('error', null)
  expect(OTHER_REQUIRED_STRING).to.have.property('variable', 'OTHER_REQUIRED_STRING')
  expect(OTHER_REQUIRED_STRING).to.have.property('value', 'an value')
  expect(OTHER_REQUIRED_STRING).to.have.property('error', null)
  expect(A_MISSING_REQUIRED_URL).to.have.property('variable', 'A_MISSING_REQUIRED_URL')
  expect(A_MISSING_REQUIRED_URL).to.have.property('value', null)
  expect(A_MISSING_REQUIRED_URL).to.have.property('error', 'The variable is not defined on the environment.')
})

Given('a spec file with invalid checkers', function () {
  this.environmentVariables = {}
  this.specYamlFile = path.join(__dirname, SPEC_FILES_FOLDER, 'invalidCheckers.spec.yaml')
})

Then('It refuses to check and return invalid checkers', function () {
  expect(this.result.executionSuccessfully).to.equal(false)
  expect(this.result.success).to.equal(false)
  expect(this.result.messages).to.deep.equal([
    'Unrecognized type for variable NOT_RECOGNIZED_SPECIFICATION: 1',
    'Unrecognized type for variable NOT_RECOGNIZED_TYPE: wrongType'
  ])
})

Given('a spec using a formatter {string}', function (formatter) {
  this.specYamlFile = path.join(__dirname, SPEC_FILES_FOLDER, `${formatter}FormatterSpec.spec.yaml`)
  this.formatter = formatter
})

Given('environment with VARIABLE with the value {string}', function (value) {
  this.environmentVariables = { VARIABLE: value }
})

When('It says that the value {string} is invalid {string}', function (value, formatterLabel) {
  expect(this.result.executionSuccessfully).to.equal(false)
  expect(this.result.success).to.equal(true)
  expect(this.result.hasErrors).to.equal(true)

  const [check] = this.result.variables
  expect(check.error).to.equal(`The value: "${value}" is not a valid ${formatterLabel}.`)
})
