import { Event } from '@node-ts/bus-messages'
import Task from '@domain/tasks'

export class TaskCreated extends Event {
    $name = 'task-manager/tasks/task-created'
    $version = 1

  constructor (
    readonly task: Task
  ) {super()}
}
