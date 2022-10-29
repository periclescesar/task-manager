import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import jwtConfig from '@config/jwtConfig'
import AuthUseCase from '@domain/users/auth'
import HttpError from '@app/HttpError'
import { DomainError } from '@domain'

export default class AuthController {
  constructor (
    private readonly authUseCase: AuthUseCase,
  ) {}

  async authenticate (req: Request, res: Response): Promise<void> {
    try {
      const user = await this.authUseCase.handle(req.body)
      const token = jwt.sign({ sub: user.id, role: user.role }, jwtConfig.secret)

      res.json({ token: token }).status(200)
    } catch (e) {
      if (e instanceof DomainError) {
        throw new HttpError(400, 'name is incorrect')
      }

      throw e
    }
  }
}
