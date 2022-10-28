import { DomainEvent, DomainEventBus } from '@domain'
import { TaskCreated } from '@infra/events/taskCreated/TaskCreated'
import { BusInstance } from '@node-ts/bus-core'
import TaskMap from '@infra/mappers/TaskMap'
import { TaskCreated as DomainTaskCreated } from '@domain/tasks'

export default class EventBus implements DomainEventBus {
  constructor (
    private readonly bus: BusInstance,
  ) {}

  async publish (event: DomainEvent) {
    const eventMap = {
      DomainTaskCreated: new TaskCreated(TaskMap.toPersistence((<DomainTaskCreated>event).task)),
    }
    const infraEvent = eventMap[`Domain${event.constructor.name}`]
    await this.bus.publish(infraEvent)
  }
}
