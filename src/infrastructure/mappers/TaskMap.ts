import Task from '@domain/tasks'
import UserMap from '@infra/mappers/UserMap'

export default class TaskMap {
  public static toPersistence (task: Task): any {
    return {
      id: task.id,
      user: task.user.id,
      summary: task.summary,
      performedAt: task.performedAt,
    }
  }

  public static toDomain (raw: any): Task {
    return new Task({
      id: raw.id,
      summary: raw.summary,
      user: UserMap.toDomain(raw.user),
      performedAt: raw.performedAt,
    })
  }
}

