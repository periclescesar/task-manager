import Task from '@domain/tasks'

export default interface DeleteTaskRepository {
  delete(task: Task): Promise<void>
  findTaskById (id: number): Promise<Task>
}
