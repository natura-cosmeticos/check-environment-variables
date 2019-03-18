const RegexVariableCheckerCreator = require('./RegexVariableCheckerCreator');

const NUMBER_REGEX = /^[+-]?\d+|\.\d+|[+-]?\d+\.\d+$/.source;

module.exports = RegexVariableCheckerCreator(NUMBER_REGEX, 'number');
