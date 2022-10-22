import env from 'env-var'
import { LogLevelString } from 'bunyan'

export default {
  name: 'task-manager',
  level: env.get('LOG_LEVEL').required().asString() as LogLevelString,
}
