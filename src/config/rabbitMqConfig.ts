import env from 'env-var'

export default {
  queueName: 'tasks-application-queue',
  connectionString: `amqp://guest:guest@${env.get('RABBITMQ_HOST').default('localhost').asString()}`,
  maxRetries: 5,
}
