import { Bus, BusInstance, ClassConstructor } from '@node-ts/bus-core'
import TaskCreatedHandler from '@infra/events/taskCreated/TaskCreatedHandler'
import { RabbitMqTransport } from '@node-ts/bus-rabbitmq'
import { AwilixContainer } from 'awilix'
import rabbitMqConfig from '@config/rabbitMqConfig'

const rabbitMqTransport = new RabbitMqTransport(rabbitMqConfig)

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
