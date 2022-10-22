Feature:
  As a technician, I want to save my performed task for my Manager to see what I did on my workday.

  Scenario:
    Given I am logged as a technician
    When I save my task with summary 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
    Then I will receive feedback that my task was created with: id, summary, and creation date
    And My Manager receives a notification about the task performed

  Scenario:
    Given I am logged as a technician
    When I save my task with the summary with more than 2500 characters
    Then I will receive feedback error that the summary is too big
