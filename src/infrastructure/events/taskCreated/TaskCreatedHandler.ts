import { Handler } from '@node-ts/bus-core'
import { TaskCreated } from './TaskCreated'
import { NotifyTaskCreatedUseCase } from '@domain/tasks'
import knexTaskRepository from '@infra/repositories/knexTaskRepository'

export default class TaskCreatedHandler implements Handler<TaskCreated> {
  messageType = TaskCreated

  constructor (
    private readonly notifyTaskCreatedUseCase: NotifyTaskCreatedUseCase,
    private readonly taskRepository: knexTaskRepository,
  ) {}

  async handle (event: TaskCreated) {
    const task = await this.taskRepository.findTaskById(event.task.id!)
    await this.notifyTaskCreatedUseCase.handle(task)
  }
}
