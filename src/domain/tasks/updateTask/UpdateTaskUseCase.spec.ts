import UpdateTaskUseCase from './UpdateTaskUseCase'
import newUpdateTaskRepositoryMock from './UpdateTaskRepository.mock'
import { faker } from '@faker-js/faker'
import Task from '@domain/tasks/Task'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'
import PayloadError from '@domain/PayloadError'
import TaskNotFoundError from '@domain/tasks/TaskNotFoundError'

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

  it('fail: only owner can update', async () => {
    const mUpdateRepo = newUpdateTaskRepositoryMock()
    const uc = new UpdateTaskUseCase(mUpdateRepo)

    const mUser = newUserFake(Role.TECHNICIAN)

    const updatePayload = {
      id: 1,
      summary: faker.lorem.paragraphs(1),
      userId: mUser.id! + 1,
    }

    mUpdateRepo.findTaskById.mockResolvedValue(new Task({
      id: 1,
      summary: updatePayload.summary,
      user: mUser,
    }))

    await expect(uc.handle(updatePayload)).rejects.toThrow(new PayloadError('only owner can update', 'message'))
  })

  it('fail: task not found', async () => {
    const mUpdateRepo = newUpdateTaskRepositoryMock()
    const uc = new UpdateTaskUseCase(mUpdateRepo)

    const mUser = newUserFake(Role.TECHNICIAN)

    const updatePayload = {
      id: 1,
      summary: faker.lorem.paragraphs(1),
      userId: mUser.id!,
    }

    mUpdateRepo.findTaskById.mockRejectedValue(new TaskNotFoundError())

    await expect(uc.handle(updatePayload)).rejects.toThrow(new TaskNotFoundError())
  })
})
