import Task from '@domain/tasks'

export default interface ListTasksRepository {
  list (): Promise<Task[]>
}
