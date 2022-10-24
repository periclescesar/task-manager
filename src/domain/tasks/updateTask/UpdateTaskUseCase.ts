import Task from '@domain/tasks'
import UpdateTaskRepository from './UpdateTaskRepository'

export default class UpdateTaskUseCase {
  constructor (
    private readonly updateTaskRepository: UpdateTaskRepository,
  ) {}

  handle (task: Task): Promise<Task> {
    return this.updateTaskRepository.update(task)
  }
}
