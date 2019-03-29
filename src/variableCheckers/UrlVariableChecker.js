const RegexVariableCheckerCreator = require('./RegexVariableCheckerCreator');

// eslint-disable-next-line no-useless-escape, max-len
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.source;

module.exports = RegexVariableCheckerCreator(URL_REGEX, 'URL');
