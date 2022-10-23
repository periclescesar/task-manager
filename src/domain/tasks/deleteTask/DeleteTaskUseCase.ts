import DeleteTaskRepository from './DeleteTaskRepository'

export default class DeleteTaskUseCase {
  constructor (
    private readonly deleteTaskRepository: DeleteTaskRepository,
  ) {}

  async handle (id: number): Promise<void> {
    return this.deleteTaskRepository.delete(id)
  }
}
