import { DomainError } from '@domain'

export default class UserNotFoundError extends DomainError {
  message = 'user not found'
}
