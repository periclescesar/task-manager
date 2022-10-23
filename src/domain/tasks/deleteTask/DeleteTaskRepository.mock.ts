import DeleteTaskRepository from './DeleteTaskRepository'

export const newDeleteTaskRepositoryMock = (): jest.Mocked<DeleteTaskRepository> => ({
  delete: jest.fn(),
})
