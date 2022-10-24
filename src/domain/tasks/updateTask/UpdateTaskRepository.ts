import Task from '@domain/tasks'

export default interface UpdateTaskRepository {
  update (task: Task): Promise<Task>
}
