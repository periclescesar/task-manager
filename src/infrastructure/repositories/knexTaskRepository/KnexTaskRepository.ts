import Task, {
  CreateTaskRepository,
  DeleteTaskRepository,
  ListTasksRepository,
  UpdateTaskRepository,
} from '@domain/tasks'
import { DatabaseClient } from '@infra/clients'
import { DomainError } from '@domain'

export default class KnexTaskRepository
  implements CreateTaskRepository,
    ListTasksRepository,
    DeleteTaskRepository,
    UpdateTaskRepository {
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

  async delete (id: number): Promise<void> {
    await this.db.connection()
      .delete()
      .from<Task>(KnexTaskRepository.tableName)
      .where({ id: id })
      .catch((_e: Error) => {
        throw new DomainError('tasks not found')
      })
  }

  async update (task: Task): Promise<Task> {
    if (task.id === undefined) {
      throw new DomainError('tasks was not created')
    }

    await this.db.connection()
      .update(task)
      .from<Task>(KnexTaskRepository.tableName)
      .where({ id: task.id })
      .catch((_e: Error) => {
        throw new DomainError('error on update task')
      })

    return this.findTaskById(task.id)
  }
}
