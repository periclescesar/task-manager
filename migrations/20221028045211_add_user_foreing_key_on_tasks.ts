import { Knex } from "knex";
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import CreateTableBuilder = Knex.CreateTableBuilder
import KnexUserRepository from '@infra/repositories/knexUserRepository'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.dropColumn('user')
  })
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.integer('user').unsigned().notNullable()
    table.foreign('user').references('id').inTable(KnexUserRepository.tableName)
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.dropColumn('user')
  })
  await knex.schema.alterTable(KnexTaskRepository.tableName, (table: CreateTableBuilder) => {
    table.string('user').notNullable()
  })
}
