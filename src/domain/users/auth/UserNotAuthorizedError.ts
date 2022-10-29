import { DomainError } from '@domain'

export class UserNotAuthorizedError extends DomainError {
  message = 'unauthorized'
}
