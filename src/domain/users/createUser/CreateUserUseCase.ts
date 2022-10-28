import User, { Role } from '@domain/users'
import CreateUserRepository from './CreateUserRepository'
import { DomainError } from '@domain'

export default class CreateUserUseCase {
  constructor (
    public readonly createUserRepository: CreateUserRepository,
  ) {}

  async handle (user: User): Promise<User> {
    if (await this.createUserRepository.userNameExists(user.name)) {
      throw new DomainError('user already exists')
    }

    const roles: Role[] = []
    for (let roleK in Role) {
      roles.push(Role[roleK])
    }

    if (!roles.includes(user.role)) {
      throw new DomainError('role not exists')
    }

    return this.createUserRepository.create(user)
  }
}
