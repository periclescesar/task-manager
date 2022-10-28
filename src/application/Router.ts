import express from 'express'
import authorize from '@app/middleware/authorize'
import { Role } from '@domain/users'

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

Router.post('/tasks', authorize([Role.TECHNICIAN]), async (req, res) => {
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
  const controller = req.container?.resolve('tasksController')
  await controller.createTask(req, res)
})

Router.put('/tasks/:id', authorize([Role.TECHNICIAN]), async (req, res) => {
  /**
   #swagger.summary = 'to save a task performed.'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[204] = {
     description: 'task successfully updated.',
   }
   #swagger.responses[404] = {
     description: 'task not found.',
   }
   */
  const controller = req.container?.resolve('tasksController')
  await controller.updateTask(req, res)
})

Router.get('/tasks', authorize([Role.MANAGER]), async (req, res) => {
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
     description: 'task not found.',
   }
   */
  const controller = req.container?.resolve('tasksController')
  await controller.listTasks(req, res)
})

Router.delete('/tasks/:id', authorize([Role.MANAGER]), async (req, res) => {
  /**
   #swagger.summary = 'to save a task performed.'
   #swagger.parameters['X-Request-Id'] = {
     in: 'header',
     description: 'to identify request on log'
   }
   #swagger.responses[204] = {
     description: 'task successfully deleted.',
   }
   #swagger.responses[404] = {
     description: 'task not found.',
   }
   */
  const controller = req.container?.resolve('tasksController')
  await controller.deleteTask(req, res)
})

export default Router
