import env from 'env-var'
import type { Knex } from 'knex'

const dbConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').default('5432').asPortNumber(),
    database: env.get('DB_DATABASE').required().asString(),
    user: env.get('DB_USERNAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: '../../migrations',
  },
}

export default dbConfig
