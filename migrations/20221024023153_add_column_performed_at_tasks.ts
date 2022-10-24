import { Knex } from 'knex'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import CreateTableBuilder = Knex.CreateTableBuilder

export async function up (knex: Knex): Promise<void> {
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.datetime('performedAt').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.dropColumns('performedAt')
  })
}

