import Task from '@domain/tasks'

export default interface UpdateTaskRepository {
  findTaskById (id: number): Promise<Task>
  update (task: Task): Promise<Task>
}
