import ListTasksUseCase from './ListTasksUseCase'
import { newListTasksRepositoryMock } from './ListTasksRepository.mock'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'

describe('List Task Use Case', () => {
  it('should list all tasks', async () => {
    const tasks = [
      new Task(faker.lorem.paragraphs(1), faker.name.fullName()),
      new Task(faker.lorem.paragraphs(1), faker.name.fullName()),
      new Task(faker.lorem.paragraphs(1), faker.name.fullName()),
    ]
    const mListTasksRepo = newListTasksRepositoryMock()
    mListTasksRepo.list.mockResolvedValue(tasks)

    const uc = new ListTasksUseCase(mListTasksRepo)
    expect(await uc.handle()).toStrictEqual(tasks)
  })
})
