import Task from '@domain/tasks'
import CreateTaskUseCase from './CreateTaskUseCase'
import { faker } from '@faker-js/faker'
import newDomainEventBusMock from '@domain/DomainEventBus.mock'
import newCreateTaskRepositoryMock from './CreateTaskRepository.mock'
import TaskCreated from './TaskCreated'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

describe('Create Task Use Case', () => {
  it('should be create a task', async () => {
    const mockRepo = newCreateTaskRepositoryMock()
    const mockBus = newDomainEventBusMock()
    const task = new Task(faker.lorem.paragraphs(1), newUserFake(Role.TECHNICIAN))
    mockRepo.create.mockResolvedValue(task)

    const uc = new CreateTaskUseCase(mockRepo, mockBus)

    expect(await uc.handle(task)).toBe(task)
    expect(mockRepo.create.mock.calls.length).toBe(1)
    expect(mockBus.publish.mock.calls.length).toBe(1)
    expect(mockBus.publish.mock.calls[0][0]).toBeInstanceOf(TaskCreated)
  })
})
