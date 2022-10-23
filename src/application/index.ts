import 'express-async-errors'
import express from 'express'
import { errorHandler } from '@app/middleware/errorHandler'
import { bindLogChild, requestLogger } from '@app/middleware/requestLogger'
import Router from '@app/Router'

const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.json({
  type: ['application/json'],
}))
app.use(bindLogChild)
app.use(requestLogger)

app.use(Router)
app.use(errorHandler)

export default app
