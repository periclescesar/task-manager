import { DatabaseClient } from '@infra/clients'
import { DomainError } from '@domain'
import User, { CreateUserRepository } from '@domain/users'
import UserMap from '@infra/mappers/UserMap'
import AuthRepository from '@domain/users/auth/AuthRepository'
import UserNotFoundError from '@domain/users/UserNotFoundError'

export default class KnexUserRepository implements CreateUserRepository, AuthRepository {
  public static tableName = 'users'

  constructor (
    private readonly db: DatabaseClient,
  ) {}

  async create (user: User): Promise<User> {
    const ids = await this.db.connection()
      .insert(UserMap.toPersistence(user))
      .from(KnexUserRepository.tableName)
      .catch((_e: Error) => {
        throw new DomainError('fail on save user')
      })

    return this.findUserById(ids[0])
  }

  async findUserById (id: number): Promise<User> {
    const rawUser = await this.db.connection()
      .first()
      .from<User>(KnexUserRepository.tableName)
      .where({ id: id })
      .catch((_e: Error) => {
        throw new UserNotFoundError()
      })
    return UserMap.toDomain(rawUser)
  }

  async userNameExists (name: string): Promise<boolean> {
    try {
      await this.findUserByName(name)
      return true
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        return false
      }
      throw e
    }
  }

  public async findUserByName (name: string): Promise<User> {
    const rawUser = await this.db.connection()
      .first()
      .from<User>(KnexUserRepository.tableName)
      .where({ name: name })

    if (!rawUser) {
      throw new UserNotFoundError()
    }

    return UserMap.toDomain(rawUser)
  }
}
