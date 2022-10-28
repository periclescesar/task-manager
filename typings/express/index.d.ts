import { AwilixContainer } from 'awilix'

declare global {
  namespace Express {
    import Logger = require('bunyan')

    interface Request {
      log?: Logger
      container?: AwilixContainer
    }
  }
}

export {}
