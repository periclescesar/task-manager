import DomainEventBus from './DomainEventBus'

const newDomainEventBusMock = (): jest.Mocked<DomainEventBus> => ({
  publish: jest.fn(),
})

export default newDomainEventBusMock
