import { DomainError } from '@domain'

export default class Task {
  static SUMMARY_MAX_LENGTH = 2500

  private readonly id?: number
  private readonly summary: string
  private readonly user: string

  constructor (summary: string, user: string) {
    if (summary.length > Task.SUMMARY_MAX_LENGTH) {
      throw new DomainError('the summary is more than 2500 characters')
    }

    this.summary = summary
    this.user = user
  }
}
