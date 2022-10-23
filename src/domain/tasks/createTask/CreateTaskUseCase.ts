import Task from '@domain/tasks'
import DomainEventBus from '@domain/DomainEventBus'
import CreateTaskRepository from './CreateTaskRepository'
import TaskCreated from './TaskCreated'

export default class CreateTaskUseCase {
  constructor (
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly eventBus: DomainEventBus,
  ) {}

  async handle (task: Task): Promise<Task> {
    task = await this.createTaskRepository.create(task)

    this.eventBus.publish(new TaskCreated(task))
    return task
  }
}
