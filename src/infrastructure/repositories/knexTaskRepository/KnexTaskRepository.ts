import Task from '@domain/tasks'
import tasks, { CreateTaskRepository, ListTasksRepository } from '@domain/tasks'
import { DatabaseClient } from '@infra/clients'
import { DomainError } from '@domain'

export default class KnexTaskRepository implements CreateTaskRepository, ListTasksRepository {
  public static tableName = 'tasks'

  constructor (
    private readonly db: DatabaseClient,
  ) {}

  async create (task: Task): Promise<Task> {
    const ids = await this.db.connection()
      .insert(task)
      .from(KnexTaskRepository.tableName)
      .catch((_e: Error) => {
        throw new DomainError('fail on save')
      })

    return this.findTaskById(ids[0])
  }

  async findTaskById (id: number): Promise<Task> {
    return await this.db.connection()
      .first()
      .from<Task>(KnexTaskRepository.tableName)
      .where({ id: id })
      .catch((_e: Error) => {
        throw new DomainError('task not found')
      })
  }

  async list (): Promise<Task[]> {
    return await this.db.connection()
      .select()
      .from<Task>(KnexTaskRepository.tableName)
      .catch((_e: Error) => {
        throw new DomainError('error on find tasks')
      })
  }
}
