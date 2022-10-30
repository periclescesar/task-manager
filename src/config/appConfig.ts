import env from 'env-var'

export default {
  url: env.get('URL').default('localhost').asString(),
  port: env.get('PORT').default(3000).asPortNumber(),
  webSocketKey: 'asdfasdf',
}
