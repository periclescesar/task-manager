import UpdateTaskRepository from './UpdateTaskRepository'

const newUpdateTaskRepositoryMock = (): jest.Mocked<UpdateTaskRepository> => ({
  findTaskById: jest.fn(),
  update: jest.fn(),
})

export default newUpdateTaskRepositoryMock
