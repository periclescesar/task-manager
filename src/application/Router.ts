import express from 'express'
import TasksController from '@app/controller/TasksController'
import { CreateTaskUseCase } from '@domain/tasks'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import { DatabaseClient } from '@infra/clients'
import knex from 'knex'
import dbConfig from '@config/DbConfig'
import logger from '@app/logger'
import { EventBus } from '@infra/events'

const Router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
Router.get('/health', async (_req, res) => {
  /**
   #swagger.summary = 'to get status about API'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[200] = {
     description: 'status successfully obtained.',
     schema: {
       im: true
     }
   }
   */
  res.json({ im: true })
})

Router.post('/tasks', async (req, res) => {
  /**
   #swagger.summary = 'to save a task performed.'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[200] = {
     description: 'task successfully created.',
   }
   */
  const dbClient = new DatabaseClient(knex(dbConfig), logger)
  const taskRepo = new KnexTaskRepository(dbClient)
  const eventBus = new EventBus()
  const createTaskUC = new CreateTaskUseCase(taskRepo, eventBus)
  const controller = new TasksController(createTaskUC)
  await controller.createTasks(req, res)
})

export default Router
