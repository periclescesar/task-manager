import 'dotenv/config'
import env from 'env-var'
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
    console.log(`RunServer: ${e.message}`)
  } else {
    console.log('RunServer:', e)
  }
}
