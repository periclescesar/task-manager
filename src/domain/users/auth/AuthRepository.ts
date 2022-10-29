import User from '@domain/users'

export default interface AuthRepository {
  findUserByName (name: string): Promise<User>
}
