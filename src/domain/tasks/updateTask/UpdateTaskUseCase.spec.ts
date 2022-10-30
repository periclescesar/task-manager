import UpdateTaskUseCase from './UpdateTaskUseCase'
import newUpdateTaskRepositoryMock from './UpdateTaskRepository.mock'
import { faker } from '@faker-js/faker'
import Task from '@domain/tasks/Task'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

describe('Update Task Use Case', () => {
  it('success', async () => {
    const mUpdateRepo = newUpdateTaskRepositoryMock()
    const uc = new UpdateTaskUseCase(mUpdateRepo)

    const mUser = newUserFake(Role.TECHNICIAN)

    const updatePayload = {
      id: 1,
      summary: faker.lorem.paragraphs(1),
      userId: mUser.id!,
    }

    mUpdateRepo.findTaskById.mockResolvedValue(new Task({
      id: 1,
      summary: updatePayload.summary,
      user: mUser,
    }))

    await uc.handle(updatePayload)
    expect(mUpdateRepo.update).toBeCalledTimes(1)
  })
})
