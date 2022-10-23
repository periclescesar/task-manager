import Task from '@domain/tasks'

export default interface CreateTaskRepository {
  create(task: Task): Promise<Task>
}
