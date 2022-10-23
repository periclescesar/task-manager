import { ErrorRequestHandler, Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import HttpError from '@app/HttpError'

export const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof HttpError) {
    res.status(err.statusCode)
    res.json({ message: err.message })
    return
  }

  req.log?.error(err)

  res.status(500)
  res.json({ message: 'internal_error' })
}
