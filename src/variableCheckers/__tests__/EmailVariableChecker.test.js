describe('variableCheckers:EmailVariableChecker', () => {
  const { expect } = require('chai');
  const EmailVariableChecker = require('../EmailVariableChecker');

  it('returns an error when variableValue is not an e-mail', () => {
    const { error } = EmailVariableChecker('an invalid e-mail', { variableName: 'A_VARIABLE' });

    expect(error).to.equal('The value: "an invalid e-mail" is not a valid e-mail.');
  });

  it('returns error null when variableValue is an e-mail', () => {
    const { error } = EmailVariableChecker('valid@email.com', { variableName: 'A_VARIABLE' });

    expect(error).to.equal(null);
  });
});
