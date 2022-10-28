import Task from '@domain/tasks'
import { Notifiable } from './Notifiable'

export default class NotifyTaskCreatedUseCase {
  constructor (
    private readonly notifyService: Notifiable
  ) {}

  async handle (task: Task): Promise<void> {
    this.notifyService.notify(`The tech ${task.user} performed the task "${task.summary}" on date ${task.performedAt}`)
  }
}
