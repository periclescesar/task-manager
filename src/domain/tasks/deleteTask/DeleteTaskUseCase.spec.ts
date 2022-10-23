import DeleteTaskUseCase from './DeleteTaskUseCase'
import { newDeleteTaskRepositoryMock } from './DeleteTaskRepository.mock'
import { DomainError } from '@domain'

describe('Delete Task Use Case', () => {
  it('success', async () => {
    const mDeleteTaskRepo = newDeleteTaskRepositoryMock()
    const uc = new DeleteTaskUseCase(mDeleteTaskRepo)
    mDeleteTaskRepo.delete.mockResolvedValue()

    await expect(uc.handle(1)).resolves
  })

  it('fail: not found', async () => {
    const mDeleteTaskRepo = newDeleteTaskRepositoryMock()
    const uc = new DeleteTaskUseCase(mDeleteTaskRepo)
    mDeleteTaskRepo.delete.mockRejectedValue(new DomainError('task not found'))

    await expect(uc.handle(2)).rejects
  })
})
