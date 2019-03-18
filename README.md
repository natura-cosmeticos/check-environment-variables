[![Known Vulnerabilities](https://snyk.io/test/github/natura-cosmeticos/check-environment-variables/badge.svg?targetFile=package.json)](https://snyk.io/test/github/natura-cosmeticos/check-environment-variables?targetFile=package.json)
[![Build Status](https://travis-ci.org/natura-cosmeticos/check-environment-variables.svg?branch=master)](https://travis-ci.org/natura-cosmeticos/check-environment-variables)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8426d68f7eac481c9f3ae07b8eb1805b)](https://www.codacy.com/app/fabricioffc/check-environment-variables?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=natura-cosmeticos/check-environment-variables&amp;utm_campaign=Badge_Grade)


# check-environment-variables

Check environment variables helps verify variables set by setup files (ex: spec.yaml) and also in the environment itself.

### How to use

If you want to check your environment variables you can run: `check-variables`

Now to check if the variables in a spec file, you need to run: `validate-spec-yaml [MY_SPEC_FILE_PATH]`

The comparison will occur according to the templates files in `/templates`.

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
