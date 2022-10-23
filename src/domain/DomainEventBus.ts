import DomainEvent from '@domain/DomainEvent'

export default interface DomainEventBus {
  publish(event: DomainEvent)
}
