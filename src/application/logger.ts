import { createLogger } from 'bunyan'
import loggerConfig from '@config/loggerConfig'

const logger = createLogger(loggerConfig)

export default logger
