import { Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { Role } from '@domain/users'
import { expressjwt as jwt, Request as JWTRequest } from 'express-jwt'
import jwtConfig from '@config/jwtConfig'

const authorize = (roles: Role[] = []) => {
  return [
    jwt({ secret: jwtConfig.secret, algorithms: ["HS256"] }),
    (req: JWTRequest, res: Response, next: NextFunction): void => {
    const userRole = req.auth?.role
    if (!roles.includes(<Role>userRole)) {
      res.status(401).json({ message: 'unauthorized' })
      return
    }
    next()
  }]
}

export default authorize
