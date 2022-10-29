import UpdateTaskUseCase from './UpdateTaskUseCase'
import newUpdateTaskRepositoryMock from './UpdateTaskRepository.mock'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

describe('Update Task Use Case', () => {
  it('success', async () => {
    const mUpdateRepo = newUpdateTaskRepositoryMock()
    const uc = new UpdateTaskUseCase(mUpdateRepo)

    const task = new Task({
      summary: '',
      user: newUserFake(Role.TECHNICIAN),
    })
    task.summary = faker.lorem.paragraphs(1)

    await uc.handle(task)
    expect(mUpdateRepo.update).toBeCalledTimes(1)
  })
})
