import Task from '@domain/tasks'
import ListTasksRepository from './ListTasksRepository'

export default class ListTasksUseCase {
  constructor (
    private readonly listTasksRepository: ListTasksRepository,
  ) {}

  async handle (): Promise<Task[]> {
    return await this.listTasksRepository.list()
  }
}
