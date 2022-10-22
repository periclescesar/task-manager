Feature:
  As a manager, I want to see tasks from all the technicians to understand what they did on the workday.

  Scenario:
    Given I am logged as a manager
    When I list all tasks
    Then I will see all tasks with id, summary, creation date, update date, and technician name
