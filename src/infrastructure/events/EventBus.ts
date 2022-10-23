import { DomainEvent, DomainEventBus } from '@domain'

export default class EventBus implements DomainEventBus {
  publish (event: DomainEvent) {
    console.log(event)
  }
}
