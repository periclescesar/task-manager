import Task, {
  CreateTaskRepository,
  DeleteTaskRepository,
  ListTasksRepository,
  TaskNotFoundError,
  UpdateTaskRepository,
} from '@domain/tasks'
import { DatabaseClient } from '@infra/clients'
import { DomainError } from '@domain'
import TaskMap from '@infra/mappers/TaskMap'
import knexUserRepository from '@infra/repositories/knexUserRepository'

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
      .insert(TaskMap.toPersistence(task))
      .from(KnexTaskRepository.tableName)

    return this.findTaskById(ids[0])
  }

  async findTaskById (id: number): Promise<Task> {
    const rawTask = await this.db.connection()
      .first()
      .from<Task>(KnexTaskRepository.tableName)
      .join(knexUserRepository.tableName, 'users.id', '=', 'tasks.user')
      .where({ 'tasks.id': id })
      .options({ nestTables: true })
      .then(raw => {
        raw.tasks.user = raw.users
        return raw.tasks
      })

    if (!rawTask) {
      throw new TaskNotFoundError()
    }

    return TaskMap.toDomain(rawTask)
  }

  async list (): Promise<Task[]> {
    const rawTasks = await this.db.connection()
      .select()
      .from<Task>(KnexTaskRepository.tableName)
      .join(knexUserRepository.tableName, 'users.id', '=', 'tasks.user')

    return rawTasks.map((task) => TaskMap.toDomain(task))
  }

  async delete (id: number): Promise<void> {
    await this.db.connection()
      .delete()
      .from<Task>(KnexTaskRepository.tableName)
      .where({ id: id })
  }

  async update (task: Task): Promise<Task> {
    if (task.id === undefined) {
      throw new DomainError('tasks was not created')
    }

    await this.db.connection()
      .update(TaskMap.toPersistence(task))
      .from<Task>(KnexTaskRepository.tableName)
      .where({ id: task.id })
      .catch((_e: Error) => {
        throw new DomainError('error on update task')
      })

    return this.findTaskById(task.id)
  }
}
