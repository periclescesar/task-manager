import { Knex } from 'knex'
import CreateTableBuilder = Knex.CreateTableBuilder
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.increments('id')
    table.string('summary').notNullable()
    table.string('user').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(KnexTaskRepository.tableName)
}

