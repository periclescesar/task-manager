import User from '@domain/users'

export default class UserMap {
  public static toPersistence (user: User): any {
    return {
      id: user.id,
      name: user.name,
      role: user.role,
    }
  }

  public static toDomain (raw: any): User {
    return new User({
      id: raw.id,
      name: raw.name,
      role: raw.role,
    })
  }
}

