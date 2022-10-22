Feature:
  I, as a manager, want to delete a task for maintain the correct history.

  Scenario:
    Given I am logged as a manager
    When I delete a task with id '1234'
    Then I will receive feedback that task was deleted
