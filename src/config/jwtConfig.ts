import env from 'env-var'

export default {
  secret: env.get('SECRET').required().asString(),
}
