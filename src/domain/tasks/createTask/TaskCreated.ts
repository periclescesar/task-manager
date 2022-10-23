import { DomainEvent } from '@domain'
import Task from '@domain/tasks'

export default class TaskCreated extends DomainEvent {
  constructor (task: Task) {super()}
}
