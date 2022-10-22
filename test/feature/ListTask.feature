Feature:
  I, as a manager, want to see tasks from all the technicians for understand what they did on workday.

  Scenario:
    Given I am logged as a manager
    When I list all tasks
    Then I will see all tasks with: id, summary, creation date, update date, and technician name
