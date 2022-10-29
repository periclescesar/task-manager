import ListTasksUseCase from './ListTasksUseCase'
import { newListTasksRepositoryMock } from './ListTasksRepository.mock'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'
import newUserFake from '@domain/users/User.mock'
import { Role } from '@domain/users'

describe('List Task Use Case', () => {
  it('should list all tasks', async () => {
    const tasks = [
      new Task({ summary: faker.lorem.paragraphs(1), user: newUserFake(Role.TECHNICIAN) }),
      new Task({ summary: faker.lorem.paragraphs(1), user: newUserFake(Role.TECHNICIAN) }),
      new Task({ summary: faker.lorem.paragraphs(1), user: newUserFake(Role.TECHNICIAN) }),
    ]
    const mListTasksRepo = newListTasksRepositoryMock()
    mListTasksRepo.list.mockResolvedValue(tasks)

    const uc = new ListTasksUseCase(mListTasksRepo)
    expect(await uc.handle()).toStrictEqual(tasks)
  })
})
