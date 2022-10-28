import Task from './Task'
import { faker } from '@faker-js/faker'
import { DomainError } from '@domain'

describe('Task', () => {
  it('fail: summary more than 2500', async () => {

    expect(() => {new Task(faker.lorem.paragraphs(100), faker.name.fullName())})
      .toThrowError(new DomainError('the summary is more than 2500 characters'))
  })

  it('success: new task', async () => {
    let task: Task
    expect(() => {task = new Task(faker.lorem.paragraphs(1), faker.name.fullName())})
      .not.toThrowError(DomainError)

    expect(task!.id).toBeUndefined()
  })

  it('success: new task to update', async () => {
    let task: Task
    expect(() => {task = new Task(faker.lorem.paragraphs(1), faker.name.fullName(), undefined, 1)})
      .not.toThrowError(DomainError)

    expect(task!.id).toBe(1)
  })
})
