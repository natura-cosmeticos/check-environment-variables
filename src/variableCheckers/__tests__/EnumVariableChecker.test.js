describe('variableCheckers:EnumVariableChecker', () => {
  const { expect } = require('chai');
  const { lorem } = require('faker');
  const EnumVariableChecker = require('../EnumVariableChecker');

  it('returns no error when the variableValue is included on possibleValues', () => {
    const variableValue = 'included';
    const { error } = EnumVariableChecker(variableValue, {
      possibleValues: ['included', 'also included'],
      variableName: 'A_VARIABLE',
    });

    expect(error).to.equal(null);
  });

  it('returns an error when the variableValue is NOT include on possibleValues', () => {
    const variableValue = lorem.word();
    const { error } = EnumVariableChecker(variableValue, {
      possibleValues: ['included', 'also included'],
      variableName: 'A_VARIABLE',
    });

    expect(error).to.equal(`The value: "${variableValue}" does not match possible values (included,also included).`);
  });

  it('returns as invalid when possibleValues is not an array', () => {
    const possibleValues = { fake: 'array', includes: true };
    const { invalid, error } = EnumVariableChecker('does not matter', { possibleValues, variableName: 'SHELL' });

    expect(invalid).to.equal(true);
    expect(error).to.equal('The specification possibleValues of SHELL is not an array.');
  });
});
