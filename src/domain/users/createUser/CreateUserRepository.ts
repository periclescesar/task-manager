import User from '@domain/users'

export default interface CreateUserRepository {
  userNameExists (user: string): Promise<boolean>
  create (user: User): Promise<User>
}
