import DeleteTaskRepository from './DeleteTaskRepository'

export default class DeleteTaskUseCase {
  constructor (
    private readonly deleteTaskRepository: DeleteTaskRepository,
  ) {}

  async handle (id: number): Promise<void> {
    return await this.deleteTaskRepository.delete(id)
  }
}
