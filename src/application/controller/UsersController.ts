import { Request, Response } from 'express'
import User, { CreateUserUseCase } from '@domain/users'
import UserMap from '@infra/mappers/UserMap'
import HttpError from '@app/HttpError'
import { DomainError } from '@domain'

export default class UsersController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async createUser (req: Request, res: Response): Promise<void> {
    let user: User
    try {
      user = new User({ name: req.body.name, role: req.body.role })

    } catch (e) {
      if (e instanceof Error) {
        throw new HttpError(400, e.message)
      }
      throw e
    }
    try {
      user = await this.createUserUseCase.handle(user)
    } catch (e) {
      if (e instanceof DomainError) {
        throw new HttpError(400, e.message)
      }
      throw e
    }

    res.json(UserMap.toPersistence(user)).status(200)
  }
}
