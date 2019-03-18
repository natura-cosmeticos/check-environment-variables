/* eslint-disable no-useless-escape */
const RegexVariableCheckerCreator = require('./RegexVariableCheckerCreator');

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.source;

module.exports = RegexVariableCheckerCreator(URL_REGEX, 'URL');
