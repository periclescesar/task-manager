import Task from '@domain/tasks'
import UserMap from '@infra/mappers/UserMap'
import { Role } from '@domain/users'

export default class TaskMap {
  public static toPersistence (task: Task): any {
    return {
      id: task.id,
      user: UserMap.toPersistence(task.user),
      summary: task.summary,
      performedAt: task.performedAt,
    }
  }

  public static toDomain (raw: any): Task {
    return new Task(raw.summary, UserMap.toDomain({ name: raw.user, role: Role.TECHNICIAN }), raw.performedAt, raw.id)
  }
}

