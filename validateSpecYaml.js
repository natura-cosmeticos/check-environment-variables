const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

const { checkVariablesIO } = require('./index')

const specYamlFile = fs.readFileSync(path.join(__dirname, 'examples', 'spec-full.yaml'), 'utf8')
const spec = YAML.parse(specYamlFile)

function hasAWellKnowDatabaseEngine (database) {
  return database && ['postgres', 'oracle', 'maria'].includes(database.engine)
}

function discoverSpecFileBySpec (spec) {
  if (hasAWellKnowDatabaseEngine(spec.database)) {
    return 'checkVariablesSpecWithDatabase.yaml'
  }

  return 'checkVariablesSpec.yaml'
}

const { hasErrors } = checkVariablesIO({
  yamlFile: path.join(__dirname, 'examples', discoverSpecFileBySpec(spec)),
  environmentVariables: spec.env,
  logger: console.log,
  bail: true,
  formatterName: 'pretty'
})

process.exit(1 - (+!hasErrors))
