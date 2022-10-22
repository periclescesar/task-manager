declare global {
  namespace Express {
    import Logger = require('bunyan')

    interface Request {
      log?: Logger
    }
  }
}

export {}
