import path from 'path'
import {
  aliasTo,
  asClass,
  asFunction,
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix'
import { createLogger } from 'bunyan'
import loggerConfig from '@config/loggerConfig'
import knex from 'knex'
import dbConfig from '@config/DbConfig'
import { DatabaseClient } from '@infra/clients'
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  ListTasksUseCase,
  NotifyTaskCreatedUseCase,
  UpdateTaskUseCase,
} from '@domain/tasks'
import { EventBus } from '@infra/events'
import TaskCreatedHandler from '@infra/events/taskCreated/TaskCreatedHandler'
import createBus from '@app/bus'
import { NotifyService } from '@infra/services/NotifyService'
import { AuthUseCase, CreateUserUseCase } from '@domain/users'
import { NotifyWebsocketService } from '@infra/services/NotifyWebsocketService'

const buildServiceContainer = async (con: AwilixContainer): Promise<AwilixContainer> => {
  con.loadModules(
    [
      'application/controller/**/!(*.mock|*.spec).(t|j)s',
      'infrastructure/repositories/**/!(*.mock|*.spec).(t|j)s',
      'infrastructure/events/**/*Handler!(.mock|.spec).(t|j)s',
    ],
    {
      cwd: path.join(__dirname, '../'),
      // We want to register `UserService` as `userService` -
      // by default loaded modules are registered with the
      // name of the file (minus the extension)
      formatName: 'camelCase',
      // Apply resolver options to all modules.
      resolverOptions: {
        // We can give these auto-loaded modules
        // the deal of a lifetime! (see what I did there?)
        // By default it's `TRANSIENT`.
        lifetime: Lifetime.SINGLETON,
        // We can tell Awilix what to register everything as,
        // instead of guessing. If omitted, will inspect the
        // module to determinw what to register as.
        register: asClass,
      },
    },
  )

  const bus = await createBus(con)
  con.register({
    nodeBus: asValue(bus),
    knexInstance: asFunction(knex, { injector: () => ({ config: dbConfig }) }),
    logger: asValue(createLogger(loggerConfig)),
    dbClient: asClass(DatabaseClient, {
      dispose: async (dbClient) => await dbClient.disconnect(),
    }),
    notifyService: asClass(NotifyWebsocketService),
    createTaskUseCase: asClass(CreateTaskUseCase),
    listTasksUseCase: asClass(ListTasksUseCase),
    deleteTaskUseCase: asClass(DeleteTaskUseCase),
    updateTaskUseCase: asClass(UpdateTaskUseCase),
    notifyTaskCreatedUseCase: asClass(NotifyTaskCreatedUseCase),
    createUserUseCase: asClass(CreateUserUseCase),
    authUseCase: asClass(AuthUseCase),
    eventBus: asClass(EventBus, { injector: () => ({ bus: bus }) }),
    taskCreatedHandler: asClass(TaskCreatedHandler),
  })

  con.register({
    log: aliasTo('logger'),
    db: aliasTo('dbClient'),
    taskRepository: aliasTo('knexTaskRepository'),
    createTaskRepository: aliasTo('knexTaskRepository'),
    listTasksRepository: aliasTo('knexTaskRepository'),
    deleteTaskRepository: aliasTo('knexTaskRepository'),
    updateTaskRepository: aliasTo('knexTaskRepository'),
    createUserRepository: aliasTo('knexUserRepository'),
    userRepository: aliasTo('knexUserRepository'),
  })

  return con
}

const container = ((): Promise<AwilixContainer> => {
  let cont: AwilixContainer
  const getInstance = async (): Promise<AwilixContainer> => {
    if (cont === undefined) {
      cont = createContainer({ injectionMode: InjectionMode.CLASSIC })
      cont = await buildServiceContainer(cont)
      cont.resolve('log').info({ message: 'service container created' })
    }

    return cont
  }

  return getInstance()
})()

export default container
