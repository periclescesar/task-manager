import { Knex } from 'knex'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'
import TaskMap from '@infra/mappers/TaskMap'
import KnexUserRepository from '@infra/repositories/knexUserRepository'
import UserMap from '@infra/mappers/UserMap'
import { Role } from '@domain/users'

export async function seed (knex: Knex): Promise<void> {
  const TOTAL_TASKS = 10
  // Deletes ALL existing entries
  await knex(KnexTaskRepository.tableName).del()

  let users = await knex(KnexUserRepository.tableName).where({ role: Role.TECHNICIAN }).limit(10)

  // Inserts seed entries
  let tasks: Task[] = []

  for (let i = 0; i < TOTAL_TASKS; i++) {
    let user = users[faker.datatype.number({ max: users.length - 1 })]
    tasks.push(new Task({
      summary: faker.lorem.paragraphs(1),
      user: UserMap.toDomain(user),
    }))
  }

  const data = tasks.map((task: Task) => TaskMap.toPersistence(task))
  await knex(KnexTaskRepository.tableName).insert(data)
}
