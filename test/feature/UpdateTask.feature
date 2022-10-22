Feature:
  As a technician, I want to update my performed task to maintain the correct history.

  Scenario:
    Given I am logged as a technician
    When I update my task '1234' with summary 'Neque porro quisquam est qui dolorem ipsum quia euro sit amet, consectetur, adipisci velit...'
    Then I will receive feedback that my task was created with: id, summary, creation date, and update date
    And My Manager receives a notification about the task updated

  Scenario:
    Given I am logged as a technician
    When I update my task '1234' with the summary with more than 2500 characters
    Then I will receive feedback error that the summary is too big
