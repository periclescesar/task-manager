import Task from '@domain/tasks'

export default class TaskMap {
  public static toPersistence (task: Task): any {
    return {
      id: task.id,
      user: task.user,
      summary: task.summary,
      performedAt: task.performedAt
    }
  }

  public static toDomain (raw: any): Task {
    return new Task(raw.summary, raw.user, raw.performedAt, raw.id)
  }
}

