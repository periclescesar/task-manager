import ListTasksRepository from './ListTasksRepository'

export const newListTasksRepositoryMock = (): jest.Mocked<ListTasksRepository> => ({
  list: jest.fn(),
})
