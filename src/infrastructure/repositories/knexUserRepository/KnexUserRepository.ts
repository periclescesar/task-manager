import { DatabaseClient } from '@infra/clients'
import { DomainError } from '@domain'
import User, { CreateUserRepository } from '@domain/users'
import UserMap from '@infra/mappers/UserMap'

export default class KnexUserRepository implements CreateUserRepository {
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
        throw new DomainError('user not found')
      })
    return UserMap.toDomain(rawUser)
  }

  async userNameExists (name: string): Promise<boolean> {
    return this.findUserByName(name).then(() => true).catch((e:DomainError) => false)
  }

  private async findUserByName (name: string) {
    const rawUser = await this.db.connection()
      .first()
      .from<User>(KnexUserRepository.tableName)
      .where({ name: name })
      .catch((_e: Error) => {
        throw new DomainError('user not found')
      })
    return UserMap.toDomain(rawUser)
  }
}
