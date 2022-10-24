import Task from './Task'
import { faker } from '@faker-js/faker'
import { DomainError } from '@domain'

describe('Task', () => {
  it('fail: summary more than 2500', async () => {

    expect(() => {new Task(faker.lorem.paragraphs(100), faker.name.fullName(), undefined, raw.id)})
      .toThrowError(new DomainError('the summary is more than 2500 characters'))
  })

  it('success: new task', async () => {

    expect(() => {new Task(faker.lorem.paragraphs(1), faker.name.fullName(), undefined, raw.id)})
      .not.toThrowError(DomainError)
  })
})
