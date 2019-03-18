describe('variableCheckers:RequiredVariableChecker', () => {
  const { expect } = require('chai');
  const RequiredVariableChecker = require('../RequiredVariableChecker');

  it('returns an error for non filled variable', () => {
    const { error } = RequiredVariableChecker(null, { required: true });

    expect(error).to.equal('The variable is not defined on the environment.');
  });

  it('returns no error for filled variable', () => {
    const { error } = RequiredVariableChecker('filled', { required: true });

    expect(error).to.equal(null);
  });

  it('returns no error for non filled variable but not required', () => {
    const { error } = RequiredVariableChecker('', { required: false });

    expect(error).to.equal(null);
  });
});
