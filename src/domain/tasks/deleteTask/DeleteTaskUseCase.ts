import DeleteTaskRepository from './DeleteTaskRepository'

export default class DeleteTaskUseCase {
  constructor (
    private readonly deleteTaskRepository: DeleteTaskRepository,
  ) {}

  async handle (id: number): Promise<void> {
    const task = await this.deleteTaskRepository.findTaskById(id)
    return await this.deleteTaskRepository.delete(task)
  }
}
