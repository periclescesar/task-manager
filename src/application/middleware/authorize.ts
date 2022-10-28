import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { Role } from '@domain/users/Role'

const authorize = (roles: Role[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.get('role') ?? ''
    if (!roles.includes(<Role>userRole)) {
      res.status(401).json({ message: 'unauthorized' })
      return
    }
    next()
  }
}

export default authorize
