import NotifyTaskCreatedUseCase from './NotifyTaskCreatedUseCase'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'
import { Notifiable } from './Notifiable'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

const newNotifiableMock = (): jest.Mocked<Notifiable> => ({
  notify: jest.fn(),
})

describe('NotifyTaskCreatedUseCase', () => {
  it('should notify managers', async () => {
    const mNotifyService = newNotifiableMock()
    const task = new Task(faker.lorem.paragraphs(1), newUserFake(Role.TECHNICIAN))

    const uc = new NotifyTaskCreatedUseCase(mNotifyService)
    await uc.handle(task)

    expect(mNotifyService.notify).toBeCalledTimes(1)
  })
})
