import { Handler } from '@node-ts/bus-core'
import { TaskCreated } from './TaskCreated'
import Task, { NotifyTaskCreatedUseCase } from '@domain/tasks'
import TaskMap from '@infra/mappers/TaskMap'

export default class TaskCreatedHandler implements Handler<TaskCreated> {
  messageType = TaskCreated

  constructor (
    private readonly notifyTaskCreatedUseCase: NotifyTaskCreatedUseCase
  ) {}

  async handle (event: TaskCreated) {
    const task:Task = TaskMap.toDomain(event.task)
    await this.notifyTaskCreatedUseCase.handle(task)
  }
}
