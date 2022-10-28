import { Bus, BusInstance, ClassConstructor } from '@node-ts/bus-core'
import TaskCreatedHandler from '@infra/events/taskCreated/TaskCreatedHandler'
import { RabbitMqTransport, RabbitMqTransportConfiguration } from '@node-ts/bus-rabbitmq'
import { AwilixContainer } from 'awilix'

const rabbitConfiguration: RabbitMqTransportConfiguration = {
  queueName: 'tasks-application-queue',
  connectionString: 'amqp://guest:guest@localhost',
  maxRetries: 5,
}
const rabbitMqTransport = new RabbitMqTransport(rabbitConfiguration)

const createBus = async (container: AwilixContainer): Promise<BusInstance> => {
  return await Bus.configure()
    .withContainer({
      get<T> (type: ClassConstructor<T>) {
        const name = type.name[0].toLowerCase() + type.name.slice(1)
        return container.resolve(name)
      },
    })
    .withHandler(TaskCreatedHandler)
    .withTransport(rabbitMqTransport)
    .initialize()
}

export default createBus
