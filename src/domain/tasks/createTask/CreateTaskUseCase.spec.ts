import Task from '@domain/tasks'
import CreateTaskUseCase from './CreateTaskUseCase'
import { faker } from '@faker-js/faker'
import newDomainEventBusMock from '@domain/DomainEventBus.mock'
import newCreateTaskRepositoryMock from './CreateTaskRepository.mock'
import TaskCreated from './TaskCreated'
import newUserFake from '@domain/users/User.mock'
import UserRepository from './UserRepository'
import { Role } from '@domain/users'
import PayloadError from '@domain/PayloadError'

const newUserRepositoryMock = (): jest.Mocked<UserRepository> => ({
  findUserById: jest.fn(),
})

describe('Create Task Use Case', () => {
  it('should be create a task', async () => {
    const mockTaskRepo = newCreateTaskRepositoryMock()
    const mockUserRepo = newUserRepositoryMock()
    const mockBus = newDomainEventBusMock()

    const taskPayload = {
      summary: faker.lorem.paragraphs(1),
      userId: 1,
      performedAt: faker.datatype.datetime().toString(),
    }

    const task = new Task({
      id: faker.datatype.number(),
      summary: taskPayload.summary,
      user: newUserFake(Role.TECHNICIAN, taskPayload.userId),
      performedAt: new Date(taskPayload.performedAt),
    })

    mockTaskRepo.create.mockResolvedValue(task)

    const uc = new CreateTaskUseCase(mockUserRepo, mockTaskRepo, mockBus)

    expect(await uc.handle(taskPayload)).toBe(task)
    expect(mockTaskRepo.create.mock.calls.length).toBe(1)
    expect(mockBus.publish.mock.calls.length).toBe(1)
    expect(mockBus.publish.mock.calls[0][0]).toBeInstanceOf(TaskCreated)
  })

  it('user not defined', async () => {
    const mockTaskRepo = newCreateTaskRepositoryMock()
    const mockUserRepo = newUserRepositoryMock()
    const mockBus = newDomainEventBusMock()

    const taskPayload = {
      summary: faker.lorem.paragraphs(1),
      performedAt: faker.datatype.datetime().toString(),
    }

    const task = new Task({
      id: faker.datatype.number(),
      summary: taskPayload.summary,
      user: newUserFake(Role.TECHNICIAN),
      performedAt: new Date(taskPayload.performedAt),
    })

    mockTaskRepo.create.mockResolvedValue(task)

    const uc = new CreateTaskUseCase(mockUserRepo, mockTaskRepo, mockBus)

    await expect(uc.handle(taskPayload)).rejects.toThrow(new PayloadError('is not a number', 'userId'))
  })
})
