# check-environment-variables

Check environment variables helps verify variables set by setup files (ex: spec.yaml) and also in the environment itself.

### How to use

If you want to check your environment variables you can run: `npm run check-variables`

Now to check if the variables in a spec file, you need to run: `npm run validate-spec-yaml [MY_SPEC_FILE_PATH]`

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
