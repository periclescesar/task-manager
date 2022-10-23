import { Knex } from 'knex'
import Logger from 'bunyan'

export default class DatabaseClient {
  constructor (
    private readonly knexInstance: Knex,
    private readonly log: Logger,
  ) {}

  public connection (): Knex {
    return this.knexInstance
  }

  public async disconnect (): Promise<void> {
    await this.knexInstance.destroy()
    this.log.info('Database Client: disconnected')
  }
}
