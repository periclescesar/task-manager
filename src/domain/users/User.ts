import Role from './Role'

interface UserProps {
  id?: number
  name: string
  role: Role
}

export default class User {
  private _props: UserProps

  constructor (props: UserProps) {
    this._props = props
  }

  get id (): number|undefined {
    return this._props.id
  }

  get name (): string {
    return this._props.name
  }

  get role (): Role {
    return this._props.role
  }
}
