Feature:
  As a manager, I want to delete a task to maintain the correct history.

  Scenario:
    Given I am logged as a manager
    When I delete a task with id '1234'
    Then I will receive feedback that the task was deleted
