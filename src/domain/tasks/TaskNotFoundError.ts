import { DomainError } from '@domain'

export default class TaskNotFoundError extends DomainError {
  message = 'task not found'
}
