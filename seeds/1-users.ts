import { Knex } from 'knex'
import { faker } from '@faker-js/faker'
import KnexUserRepository from '@infra/repositories/knexUserRepository'
import User from '@domain/users'
import { Role } from '@domain/users'
import UserMap from '@infra/mappers/UserMap'

export async function seed (knex: Knex): Promise<void> {
  let TOTAL_USERS = 10
  // Deletes ALL existing entries
  await knex(KnexUserRepository.tableName).del()

  // Inserts seed entries
  let users: User[] = []

  users.push(new User({
    name: 'admin',
    role: Role.MANAGER,
  }))

  TOTAL_USERS--

  for (let i = 0; i < TOTAL_USERS; i++) {
    users.push(new User({
      name: faker.name.fullName(),
      role: Role.TECHNICIAN,
    }))
  }

  await knex(KnexUserRepository.tableName).insert(users.map(user => UserMap.toPersistence(user)))
}
