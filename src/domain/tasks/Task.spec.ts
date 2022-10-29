import Task from './Task'
import { faker } from '@faker-js/faker'
import { DomainError } from '@domain'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

describe('Task', () => {
  it('fail: summary more than 2500', async () => {

    expect(() => {new Task(faker.lorem.paragraphs(100), newUserFake(Role.TECHNICIAN))})
      .toThrowError(new DomainError('the summary is more than 2500 characters'))
  })

  it('success: new task', async () => {
    let task: Task
    expect(() => {task = new Task(faker.lorem.paragraphs(1), newUserFake(Role.TECHNICIAN))})
      .not.toThrowError(DomainError)

    expect(task!.id).toBeUndefined()
  })

  it('success: new task to update', async () => {
    let task: Task
    expect(() => {task = new Task(faker.lorem.paragraphs(1), newUserFake(Role.TECHNICIAN), undefined, 1)})
      .not.toThrowError(DomainError)

    expect(task!.id).toBe(1)
  })
})
