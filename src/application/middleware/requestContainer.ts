import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import container from '@app/container'

export const requestContainer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  req.container = (await container).createScope()

  next()
}
