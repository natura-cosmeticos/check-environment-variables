Feature: Check Variables
  As a developer
  I want to check if the environment offers me the right variables
  
  Scenario: Simple validation
    Given an environment
    When I check the variables
    Then It validates the environment variables

  Scenario: Missing required Variables
    Given a environment with required variables and a missing variable
		 And a spec saying that I need the variable
    When I check those variables
    Then It says that the environment miss the variable necessary
    
  Scenario: Invalid specifications
    Given a spec file with invalid checkers
    When I check those variables
    Then It refuses to check and return invalid checkers
    
  Scenario Outline: Formatters
    Given a spec using a formatter '<formatter>'
      And environment with VARIABLE with the value '<value>'
    When I check those variables
    Then It says that the value '<value>' is invalid '<formatterLabel>', or return with error '<errorMessage>'
    
    Examples:
    | formatter | formatterLabel | value             | errorMessage |
    | url       | URL            | not a valid url   | |
    | email     | e-mail         | not a valid email | |
    | boolean   | boolean        | not boolean       | |
    | number    | number         | not a number      | |
    | enum      | enum           | wrong value       | The value: "wrong value" does not match possible values (value1,value2). |