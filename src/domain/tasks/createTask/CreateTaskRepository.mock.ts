import CreateTaskRepository from './CreateTaskRepository'

const newCreateTaskRepositoryMock = (): jest.Mocked<CreateTaskRepository> => ({
  create: jest.fn(),
})

export default newCreateTaskRepositoryMock
