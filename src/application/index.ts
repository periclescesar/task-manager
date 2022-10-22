import express from 'express'
import { errorHandler } from '@app/middleware/errorHandler'
import { bindLogChild, requestLogger } from '@app/middleware/requestLogger'
import router from '@app/router'

const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.json({
  type: ['application/json', 'text/plain'],
}))
app.use(bindLogChild)
app.use(requestLogger)

app.use(router)
app.use(errorHandler)

export default app
