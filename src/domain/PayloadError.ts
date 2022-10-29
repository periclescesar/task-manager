import { DomainError } from '@domain/index'

export default class PayloadError extends DomainError {
  param: string

  constructor (message: string, param: string) {
    super(message)
    this.param = param
  }
}
