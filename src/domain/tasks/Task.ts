import { DomainError } from '@domain'
import User from '@domain/users'

export default class Task {
  static SUMMARY_MAX_LENGTH = 2500

  private readonly _id?: number
  private readonly _user: User
  private _summary!: string
  private _performedAt!: Date

  constructor (summary: string, user: User, performedAt?: Date, id?: number) {
    this._id = id
    this._user = user
    this.summary = summary
    this.performedAt = performedAt ?? new Date()
  }

  get id (): number | undefined {
    return this._id
  }

  get summary (): string {
    return this._summary
  }

  get user (): User {
    return this._user
  }

  set summary (summary: string) {
    if (summary.length > Task.SUMMARY_MAX_LENGTH) {
      throw new DomainError('the summary is more than 2500 characters')
    }
    this._summary = summary
  }

  set performedAt (performedAt: Date) {
    this._performedAt = new Date(performedAt)
  }

  get performedAt (): Date {
    return this._performedAt
  }
}
