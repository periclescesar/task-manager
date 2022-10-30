import DeleteTaskRepository from './DeleteTaskRepository'

export const newDeleteTaskRepositoryMock = (): jest.Mocked<DeleteTaskRepository> => ({
  findTaskById: jest.fn(),
  delete: jest.fn(),
})
