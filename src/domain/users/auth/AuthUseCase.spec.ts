import { faker } from '@faker-js/faker'
import AuthUseCase from './AuthUseCase'
import AuthRepository from './AuthRepository'
import { UserNotAuthorizedError } from './UserNotAuthorizedError'
import User from '@domain/users/User'
import Role from '@domain/users/Role'
import UserNotFoundError from '@domain/users/UserNotFoundError'

const newAuthUserRepositoryMock = (): jest.Mocked<AuthRepository> => ({
  findUserByName: jest.fn(),
})

describe('Auth Use Case', () => {
  it('should authorize', async () => {
    const authPayload = {
      name: faker.name.fullName(),
    }

    const mAuthRepo = newAuthUserRepositoryMock()
    const user = new User({
      id: 1,
      name: faker.name.fullName(),
      role: Role.TECHNICIAN,
    })
    mAuthRepo.findUserByName.mockResolvedValue(user)
    const authUC = new AuthUseCase(mAuthRepo)

    expect(await authUC.handle(authPayload)).toBe(user)
  })

  it('shouldn`t authorize', async () => {
    const authPayload = {
      name: faker.name.fullName(),
    }

    const mAuthRepo = newAuthUserRepositoryMock()

    mAuthRepo.findUserByName.mockRejectedValue(new UserNotFoundError())
    const authUC = new AuthUseCase(mAuthRepo)

    await expect(authUC.handle(authPayload)).rejects.toThrow(new UserNotAuthorizedError())
  })
})
