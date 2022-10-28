import { Knex } from 'knex'
import KnexUserRepository from '@infra/repositories/knexUserRepository'
import { Role } from '@domain/users'
import CreateTableBuilder = Knex.CreateTableBuilder

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(KnexUserRepository.tableName, (table: CreateTableBuilder) => {
    table.increments('id')
    table.string('name').notNullable().unique()
    table.string('role').defaultTo(Role.TECHNICIAN).notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(KnexUserRepository.tableName)
}
