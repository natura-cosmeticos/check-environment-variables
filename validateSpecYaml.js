const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const { checkVariablesIO } = require('./index');

const specYamlFile = fs.readFileSync(path.join(__dirname, 'examples', 'spec-full.yaml'), 'utf8');
const spec = YAML.parse(specYamlFile);

function hasAWellKnowDatabaseEngine(database) {
  return database && ['postgres', 'oracle', 'maria'].includes(database.engine);
}

function discoverSpecFileBySpec(specFile) {
  if (hasAWellKnowDatabaseEngine(specFile.database)) {
    return 'checkVariablesSpecWithDatabase.yaml';
  }

  return 'checkVariablesSpec.yaml';
}

const { hasErrors } = checkVariablesIO({
  bail: true,
  environmentVariables: spec.env,
  formatterName: 'pretty',
  // eslint-disable-next-line no-console
  logger: console.log,
  yamlFile: path.join(__dirname, 'examples', discoverSpecFileBySpec(spec)),
});

process.exit(1 - (+!hasErrors));
