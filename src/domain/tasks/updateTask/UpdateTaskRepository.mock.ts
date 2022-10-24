import UpdateTaskRepository from './UpdateTaskRepository'

const newUpdateTaskRepositoryMock = (): jest.Mocked<UpdateTaskRepository> => ({
  update: jest.fn(),
})

export default newUpdateTaskRepositoryMock
