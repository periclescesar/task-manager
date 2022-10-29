import User from '@domain/users'
import PayloadError from '@domain/PayloadError'

interface TaskProps {
  id?: number
  user: User
  summary: string
  performedAt?: Date
}

export default class Task {
  static SUMMARY_MAX_LENGTH = 2500

  private _props: TaskProps

  constructor (props: TaskProps) {
    if (props.summary.length > Task.SUMMARY_MAX_LENGTH) {
      throw new PayloadError('limit 2500 characters', 'summary')
    }

    if (!props.performedAt) {
      props.performedAt = new Date()
    }

    this._props = props
  }

  get id (): number | undefined {
    return this._props.id
  }

  get summary (): string {
    return this._props.summary
  }

  get user (): User {
    return this._props.user
  }

  set summary (summary: string) {
    if (summary.length > Task.SUMMARY_MAX_LENGTH) {
      throw new PayloadError('limit 2500 characters', 'summary')
    }
    this._props.summary = summary
  }

  set performedAt (performedAt: Date) {
    this._props.performedAt = performedAt
  }

  get performedAt (): Date {
    return this._props.performedAt!
  }
}
