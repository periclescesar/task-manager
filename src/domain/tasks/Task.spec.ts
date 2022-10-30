import Task from './Task'
import { faker } from '@faker-js/faker'
import { DomainError } from '@domain'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'
import PayloadError from '@domain/PayloadError'

describe('Task', () => {
  it('fail: summary more than 2500', async () => {
    expect(() => {
      new Task({
        summary: faker.lorem.paragraphs(100),
        user: newUserFake(Role.TECHNICIAN),
      })
    }).toThrowError(new PayloadError('limit 2500 characters', 'summary'))
  })

  it('success: new task', async () => {
    let task: Task
    expect(() => {
      task = new Task({
        summary: faker.lorem.paragraphs(1),
        user: newUserFake(Role.TECHNICIAN),
      })
    }).not.toThrowError(DomainError)

    expect(task!.id).toBeUndefined()
  })

  it('success: new task to update', async () => {
    let task: Task
    expect(() => {
      task = new Task({
        id: 1,
        summary: faker.lorem.paragraphs(1),
        user: newUserFake(Role.TECHNICIAN),
      })
    }).not.toThrowError(DomainError)

    expect(task!.id).toBe(1)
  })
})
