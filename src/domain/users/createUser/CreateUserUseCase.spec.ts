import { faker } from '@faker-js/faker'
import CreateUserUseCase from './CreateUserUseCase'
import User, { Role } from '@domain/users'
import CreateUserRepository from './CreateUserRepository'
import { DomainError } from '@domain'

const newCreateUserRepositoryMock = (): jest.Mocked<CreateUserRepository> => ({
  create: jest.fn(),
  userNameExists: jest.fn(),
})

describe('Create User Use Case', () => {
  it('success', async () => {
    const user = new User({ name: faker.name.fullName(), role: Role.TECHNICIAN })
    const mCreateUserRepository = newCreateUserRepositoryMock()
    mCreateUserRepository.userNameExists.mockResolvedValue(false)
    mCreateUserRepository.create.mockResolvedValue(new User({ id: 1, name: user.name, role: user.role }))

    const uc = new CreateUserUseCase(mCreateUserRepository)
    await uc.handle(user)

    expect(mCreateUserRepository.create).toBeCalled()
  })

  it('should throw error user already exists', async () => {
    const user = new User({ name: faker.name.fullName(), role: Role.TECHNICIAN })
    const mCreateUserRepository = newCreateUserRepositoryMock()
    mCreateUserRepository.userNameExists.mockResolvedValue(true)

    const uc = new CreateUserUseCase(mCreateUserRepository)
    await expect(uc.handle(user)).rejects.toThrow(new DomainError('user already exists'))

    expect(mCreateUserRepository.create).not.toBeCalled()
  })

  it('should throw error role not exists', async () => {
    const user = new User({ name: faker.name.fullName(), role: <Role>'tech' })
    const mCreateUserRepository = newCreateUserRepositoryMock()
    mCreateUserRepository.userNameExists.mockResolvedValue(false)

    const uc = new CreateUserUseCase(mCreateUserRepository)
    await expect(uc.handle(user)).rejects.toThrow(new DomainError('role not exists'))

    expect(mCreateUserRepository.create).not.toBeCalled()
  })
})
