import env from 'env-var'

export default {
  port: env.get('PORT').default(3000).asPortNumber(),
  webSocketKey: 'asdfasdf',
}
