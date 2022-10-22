import env from 'env-var'
import autogenSwagger from 'swagger-autogen'

const swaggerAutogen = autogenSwagger()

const doc = {
  info: {
    title: 'task-manager',
    version: '1.0.0',
  },
  schemes: ['http'],
  host: `localhost:${env.get('PORT').required().asString()}`,
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'X-API-Key',
    },
  },
  security: [{
    apiKeyAuth: [],
  }],
}

swaggerAutogen('./docs/swagger.json', ['./src/application/router.ts'], doc)
