import express from 'express'
import TasksController from '@app/controller/TasksController'
import { CreateTaskUseCase, ListTasksUseCase } from '@domain/tasks'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import { DatabaseClient } from '@infra/clients'
import knex from 'knex'
import dbConfig from '@config/DbConfig'
import logger from '@app/logger'
import { EventBus } from '@infra/events'

const Router = express.Router()

const dbClient = new DatabaseClient(knex(dbConfig), logger)
const taskRepo = new KnexTaskRepository(dbClient)
const eventBus = new EventBus()
const createTaskUC = new CreateTaskUseCase(taskRepo, eventBus)
const listTasksUC = new ListTasksUseCase(taskRepo)
const controller = new TasksController(createTaskUC, listTasksUC)

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
   #swagger.responses[404] = {
     description: 'has an error on task definition.',
   }
   */

  await controller.createTask(req, res)
})

Router.get('/tasks', async (req, res) => {
  /**
   #swagger.summary = 'to save a task performed.'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[200] = {
     description: 'task successfully created.',
   }
   #swagger.responses[404] = {
     description: 'has an error on task definition.',
   }
   */

  await controller.listTasks(req, res)
})
export default Router
