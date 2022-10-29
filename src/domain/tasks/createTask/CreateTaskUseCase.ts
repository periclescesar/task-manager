import Task from '@domain/tasks'
import DomainEventBus from '@domain/DomainEventBus'
import CreateTaskRepository from './CreateTaskRepository'
import TaskCreated from './TaskCreated'
import UserRepository from './UserRepository'
import PayloadError from '@domain/PayloadError'

interface CreateTaskUseCasePayload {
  userId: number
  summary: string
  performedAt?: string
}

export default class CreateTaskUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async handle (payload: CreateTaskUseCasePayload): Promise<Task> {
    if (!payload.userId || Number.isNaN(payload.userId)) {
      throw new PayloadError('is not a number', 'userId')
    }

    const user = await this.userRepository.findUserById(payload.userId)

    let task = new Task({
      summary: payload.summary,
      user: user,
      performedAt: payload.performedAt ? new Date(payload.performedAt): undefined,
    })

    task = await this.createTaskRepository.create(task)

    this.eventBus.publish(new TaskCreated(task))
    return task
  }
}
