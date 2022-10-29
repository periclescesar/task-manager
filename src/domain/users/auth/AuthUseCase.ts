import User from '@domain/users'
import AuthRepository from './AuthRepository'
import AuthUseCasePayload from './AuthUseCasePayload'
import UserNotFoundError from '@domain/users/UserNotFoundError'
import { UserNotAuthorizedError } from '@domain/users/auth/UserNotAuthorizedError'

export default class AuthUseCase {
  constructor (
    private readonly userRepository: AuthRepository,
  ) {}

  async handle (payload: AuthUseCasePayload): Promise<User> {
    try {
      return await this.userRepository.findUserByName(payload.name)
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new UserNotAuthorizedError()
      }

      throw e
    }
  }
}
