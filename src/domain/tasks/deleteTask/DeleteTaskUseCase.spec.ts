import DeleteTaskUseCase from './DeleteTaskUseCase'
import { newDeleteTaskRepositoryMock } from './DeleteTaskRepository.mock'

describe('Delete Task Use Case', () => {
  it('success', async () => {
    const mDeleteTaskRepo = newDeleteTaskRepositoryMock()
    const uc = new DeleteTaskUseCase(mDeleteTaskRepo)
    mDeleteTaskRepo.delete.mockResolvedValue()

    await uc.handle(1)
    expect(mDeleteTaskRepo.delete).toBeCalledTimes(1)
  })
})
