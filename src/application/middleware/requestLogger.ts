import log from '@app/logger'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { v4 as uuid } from 'uuid'

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', () => {
    const statusCode = res.statusCode

    let level = 'info'

    if (statusCode >= 500) {
      level = 'fatal'
    } else if (statusCode >= 400) {
      level = 'error'
    } else if (statusCode >= 300) {
      level = 'warn'
    }

    req.log?.[level]({
      req,
      res,
    })
  })

  next()
}

export const bindLogChild = (req: Request, res: Response, next: NextFunction): void => {
  const headerName = 'x-request-id'
  let reqId = req.header(headerName)

  if (reqId == null) {
    reqId = uuid()
  }

  req.headers[headerName] = reqId
  res.set(headerName, reqId)

  req.log = log.child({ reqId: reqId })

  next()
}
