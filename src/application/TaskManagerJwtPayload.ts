import { JwtPayload } from 'jsonwebtoken'
import { Role } from '@domain/users'

export default interface TaskManagerJwtPayload extends JwtPayload {
  role: Role
}
