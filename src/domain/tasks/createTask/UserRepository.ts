import User from '@domain/users'

export default interface UserRepository {
  findUserById (id: number): Promise<User>
}
