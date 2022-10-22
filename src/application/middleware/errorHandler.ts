import { ErrorRequestHandler, Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'

export const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  req.log?.error(err)

  res.status(500)
  res.json({ message: 'internal_error' })
}
