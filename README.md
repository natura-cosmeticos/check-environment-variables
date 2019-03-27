[![Known Vulnerabilities](https://snyk.io/test/github/natura-cosmeticos/check-environment-variables/badge.svg?targetFile=package.json)](https://snyk.io/test/github/natura-cosmeticos/check-environment-variables?targetFile=package.json)
[![Build Status](https://travis-ci.org/natura-cosmeticos/check-environment-variables.svg?branch=master)](https://travis-ci.org/natura-cosmeticos/check-environment-variables)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8426d68f7eac481c9f3ae07b8eb1805b)](https://www.codacy.com/app/fabricioffc/check-environment-variables?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=natura-cosmeticos/check-environment-variables&amp;utm_campaign=Badge_Grade)


# check-environment-variables

Check environment variables helps verify variables set by setup files (ex: spec.yaml) and also in the environment itself.

### How to use

If you want to check your environment variables you can run: `check-variables`, when you execute this binary file it will
look for a file, on the same level with the name `checkVariablesSpec.yaml`, and it is going to compare the variables on
the **process.env** and compare against the specification on the file.

See this example file:
```yaml
checkVariables:
  START_SERVER: # required boolean variable (true or false)
    type: boolean
    required: true
  REQUEST_TIMEOUT: number # not require number
  API_HOST: url # not required url
  FROM_EMAIL: email # not required url
  NAMESPACE: string # not required string
  ENDPOINT: true # required variable to have on process.env
  AWS_REGION: # the variable value should be one of the possibleValues
    type: enum
    possibleValues:
      - us-east-2
      - us-east-1
      - us-west-1
      - us-west-2
  MY_OTHER_VARIABLE: # an string, starting with maria, with length from 7 to 20
    type: string
    required: true
    minLength: 7
    maxLength: 20
    regex: ^maria
```

If you run `check-variables` against this file it is going to check the varaibles `START_SERVER, REQUEST_TIMEOUT, API_HOST, FROM_EMAIL, NAMESPACE, ENDPOINT, AWS_REGION, MY_OTHER_VARIABLE` on your **process.env**

Options of `check-variables`:
```bash
# default value for yamlFile is "checkVariablesSpec.yaml"
Usage: checkVariables [options] [yamlFile]

Options:
  -V, --version                output the version number
  -b, --bail                   Indicates whether or not the proccess exits with status non ok when oneor more variables are wrong
  -f, --formatter [formatter]  The formatter of output: json, inline, pretty (default: "pretty")
  -h, --help                   output usage information
```

In order to check variables in a spec file, you need to run: `validate-spec-yaml [MY_SPEC_FILE_PATH]`

The comparison will occur according to the templates files in `/templates`.

#### Using programatically
```javascript
const checkVariables = require('check-variables');

const myVariables = {
  myServerShouldStart: process.env.START_SERVER,
  region: process.env.REGION
}

// follow the same specification of "checkVariablesSpec.yaml" file
const mySpecification = {
  myServerShouldStart: 'boolean',
  region: {
    type: 'enum',
    possibleValues: ['north', 'south']
  }
}
const result = checkVariables(myVariables, mySpecification) // as the first parameter you can also use process.env
result.success // false when the specification is not valid, true when validation happened
result.messages // when at least one of the specification are invalid you can see what is invalid
result.hasErrors  // false when all variables respects the rules in specification
result.variables // an array, items has the fields: 'variable' -> name of the variable, 'value' -> the value of variable, 'error' -> null if the value of the variable is ok against the rule, string containing the error if not ok
```

### Supported setup files

The current version only supports `spec.yaml`, an internal Natura environment setup file.

### Setup

Run `npm i`.

### Testing

Just run `npm test`.


### Lint

To verify if any lint rule was broken run: `npm run lint`.

### How to contribute

You can contribute submitting [pull requests](https://github.com/natura-cosmeticos/check-environment-variables/pulls).
