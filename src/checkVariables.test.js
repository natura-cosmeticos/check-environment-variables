describe('checkVariables', function () {
  const proxyquire = require('proxyquire');
  const { AssertionError } = require('assert');
  const { expect } = require('chai');
  const { mock } = require('sinon');

  beforeEach(function () {
    this.checkVariableMock = mock('checkVariableMock');

    this.checkVariables = proxyquire('./checkVariables', { './checkVariable': this.checkVariableMock });
    this.environmentVariables = { does: 'not matter', just: 'as reference' };
    this.checkVariablesSpecification = { does: 'not matter', just: 'as reference' };
  });

  function defineCheckVariableMockReturns(checkVariableMock, firstResult, secondResult) {
    checkVariableMock.twice()
      .onFirstCall()
      .returns(firstResult)
      .onSecondCall()
      .returns(secondResult);
  }

  context('@assertVariablesAreOk', function () {
    it('throws an assertion error when specification is invalid', function () {
      const invalidVariableCheck = { error: 'An message of error', invalid: true };
      const otherInvalidVariableCheck = { error: 'Other error', invalid: true };
      const { checkVariables, environmentVariables, checkVariablesSpecification } = this;

      defineCheckVariableMockReturns(this.checkVariableMock, invalidVariableCheck, otherInvalidVariableCheck);

      const result = checkVariables(environmentVariables, checkVariablesSpecification);

      expect(result.assertVariablesAreOk)
        .to.throw(AssertionError)
        .with.property('message', 'An message of error, Other error');
    });

    it('does NOT throw an assertion error when specification valid and there is no errors', function () {
      const { checkVariables, environmentVariables, checkVariablesSpecification } = this;

      defineCheckVariableMockReturns(this.checkVariableMock, {}, {});

      const result = checkVariables(environmentVariables, checkVariablesSpecification);

      expect(result.assertVariablesAreOk).to.not.throw(AssertionError);
    });

    it('throws an assertion error when specification valid, but the variable check hasErrors', function () {
      const invalidVariableCheck = { error: 'An message of error', variable: 'FIRST_VARIABLE' };
      const otherInvalidVariableCheck = { error: 'Other error', variable: 'OTHER_VARIABLE' };
      const { checkVariables, environmentVariables, checkVariablesSpecification } = this;

      defineCheckVariableMockReturns(this.checkVariableMock, invalidVariableCheck, otherInvalidVariableCheck);

      const result = checkVariables(environmentVariables, checkVariablesSpecification);

      expect(result.assertVariablesAreOk)
        .to.throw(AssertionError)
        .with.property('message', `Some variables doesn't follow the specification:
- FIRST_VARIABLE: An message of error;
- OTHER_VARIABLE: Other error;`);
    });
  });
});
