describe('variableCheckers:StringVariableChecker', () => {
  const { expect } = require('chai');
  const StringVariableChecker = require('../StringVariableChecker');

  it('returns an error when variableValue does not match the regex', () => {
    const { error } = StringVariableChecker('bart', { regex: /homer/.source, variableName: 'SHELL' });

    expect(error).to.equal('The value does not match the specificied regex.');
  });

  it('returns an error when variableValue is shorter than the mininum length', () => {
    const { error } = StringVariableChecker('a short value', { minLength: 15, variableName: 'SHELL' });

    expect(error).to.equal('The value is shorter than 15 characters.');
  });

  it('uses 1 as minLength when not set', () => {
    const { error } = StringVariableChecker('', { variableName: 'SHELL' });

    expect(error).to.equal('The value is shorter than 1 characters.');
  });

  it('uses 1 as mininumValue of minLength when the value set is less than 1', () => {
    const { error } = StringVariableChecker('', { minLength: -1, variableName: 'SHELL' });

    expect(error).to.equal('The value is shorter than 1 characters.');
  });

  it('returns an error when variableValue is longer than the maximum length', () => {
    const { error } = StringVariableChecker('a longer value not accepted', { maxLength: 10, variableName: 'SHELL' });

    expect(error).to.equal('The value is longer than 10 characters.');
  });

  it('uses 65536 as maxLength when not set', () => {
    const { error } = StringVariableChecker('#'.repeat(700001), { variableName: 'SHELL' });

    expect(error).to.equal('The value is longer than 65536 characters.');
  });

  it('returns error null when variableValue is null and it is not required', () => {
    const { error } = StringVariableChecker(null, { variableName: 'SHELL' });

    expect(error).to.equal(null);
  });

  it('uses 65536 as maximumValue of maxLength when the value set is less than 1', () => {
    const { error } = StringVariableChecker('#'.repeat(700001), { maxLength: 70000, variableName: 'SHELL' });

    expect(error).to.equal('The value is longer than 65536 characters.');
  });

  it('returns as invalid when minLength is not a number', () => {
    const { invalid, error } = StringVariableChecker('', { minLength: true, variableName: 'SHELL' });

    expect(invalid).to.equal(true);
    expect(error).to.equal('The specification minLength of SHELL is not a number.');
  });

  it('returns as invalid when maxLength is not a number', () => {
    const { invalid, error } = StringVariableChecker('', { maxLength: true, variableName: 'SHELL' });

    expect(invalid).to.equal(true);
    expect(error).to.equal('The specification maxLength of SHELL is not a number.');
  });
});
