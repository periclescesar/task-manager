import 'dotenv/config'
import env from 'env-var'
import log from '@app/logger'
import http from 'http'
import app from '@app'

try {
  const port: number = env.get('PORT').default(3000).asPortNumber()
  const server = http.createServer(app)

  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at port ${port}`)
  })
} catch (e) {
  if (e instanceof Error) {
    log.error(`RunServer: ${e.message}`)
  } else {
    log.error('RunServer:', e)
  }
}
