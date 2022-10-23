import { Knex } from 'knex'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import Task from '@domain/tasks'
import { faker } from '@faker-js/faker'

export async function seed (knex: Knex): Promise<void> {
  const TOTAL_TASKS = 10
  // Deletes ALL existing entries
  await knex(KnexTaskRepository.tableName).del()

  // Inserts seed entries
  let tasks: Task[] = []

  for (let i = 0; i < TOTAL_TASKS; i++) {
    tasks.push(new Task(faker.lorem.paragraphs(1), faker.name.fullName()))
  }

  await knex(KnexTaskRepository.tableName).insert(tasks)
}
