import UpdateTaskUseCase from './UpdateTaskUseCase'
import newUpdateTaskRepositoryMock from './UpdateTaskRepository.mock'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'

describe('Update Task Use Case', () => {
  it('success', async () => {
    const mUpdateRepo = newUpdateTaskRepositoryMock()
    const uc = new UpdateTaskUseCase(mUpdateRepo)

    const task = new Task('', faker.name.fullName())
    task.summary = faker.lorem.paragraphs(1)

    await uc.handle(task)
    expect(mUpdateRepo.update).toBeCalledTimes(1)
  })
})
