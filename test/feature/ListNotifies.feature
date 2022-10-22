Feature:
  I, as a manager, want to watch all notifications from technicians for understand what they did on workday.

  Scenario:
    Given I am logged as a manager
    When A Technician performed a task
    Then I will receive feedback that task was create like 'The tech X performed the task Y on date Z'
