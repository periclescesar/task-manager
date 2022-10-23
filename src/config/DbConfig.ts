import env from 'env-var'
import type { Knex } from 'knex'

const DbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: env.get('DB_HOST').required().asString(),
    port: env.get('DB_PORT').default('3306').asPortNumber(),
    user: env.get('DB_USERNAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    database: env.get('DB_DATABASE').required().asString(),
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

export default DbConfig
