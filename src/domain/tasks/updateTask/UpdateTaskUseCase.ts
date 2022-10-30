import Task from '@domain/tasks'
import UpdateTaskRepository from './UpdateTaskRepository'
import PayloadError from '@domain/PayloadError'

interface UpdateTaskUseCasePayload {
  userId?: number
  id: number,
  summary?: string,
  performedAt?: string
}

export default class UpdateTaskUseCase {
  constructor (
    private readonly updateTaskRepository: UpdateTaskRepository,
  ) {}

  async handle (payload: UpdateTaskUseCasePayload): Promise<Task> {
    let task = await this.updateTaskRepository.findTaskById(payload.id)

    if (task.user.id !== payload.userId) {
      throw new PayloadError('only owner can update', 'message')
    }

    task = new Task({
      id: task.id,
      summary: payload.summary ?? task.summary,
      performedAt: payload.performedAt !== undefined ? new Date(payload.performedAt) : task.performedAt,
      user: task.user,
    })

    return this.updateTaskRepository.update(task)
  }
}
