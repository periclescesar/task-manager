import container from '@app/container'

async function run () {
  const bus = (await container).resolve('nodeBus')
  await bus.start()
}

void run()
