import { Role } from './Role'

interface UserProps {
  id: number
  name: string
  role: Role
}

export default class User {
  private props: UserProps

  constructor (props: UserProps) {
    this.props = props
  }
}
