Feature:
  As a manager, I want to watch all technicians' task notifications to understand what they did on the workday.

  Scenario:
    Given I am logged as a manager
    When A Technician performs a task
    Then I will receive feedback that task was created, like 'The tech X performed the task Y on date Z'
