import { Request, Response } from 'express'
import HttpError from '@app/HttpError'
import Task, { CreateTaskUseCase, DeleteTaskUseCase, ListTasksUseCase, UpdateTaskUseCase } from '@domain/tasks'
import { DomainError } from '@domain'
import KnexTaskRepository from '@infra/repositories/knexTaskRepository'
import TaskMap from '@infra/mappers/TaskMap'
import { Request as JWTRequest } from 'express-jwt'
import UserNotFoundError from '@domain/users/UserNotFoundError'

export default class TasksController {

  constructor (
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async createTask (req: JWTRequest, res: Response): Promise<void> {
    try {
      let task = await this.createTaskUseCase.handle({ ...req.body, userId: req.auth?.sub })
      res.json(TaskMap.toPersistence(task))
      res.status(200)
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        throw new HttpError(404, e.message)
      }

      throw e
    }
  }

  async listTasks (_req: Request, res: Response): Promise<void> {
    const tasks = await this.listTasksUseCase.handle()
    res.json(tasks.map((task: Task) => TaskMap.toPersistence(task)))
    res.status(200)
  }

  async deleteTask (req: Request, res: Response): Promise<void> {
    try {
      await this.deleteTaskUseCase.handle(Number(req.params.id))
      res.status(204)
    } catch (e) {
      if (e instanceof DomainError) {
        throw new HttpError(400, e.message)
      }

      throw e
    }
  }

  async updateTask (req: JWTRequest, res: Response): Promise<void> {
    try {
      let task = await this.updateTaskUseCase.handle({ ...req.body, id: req.params.id, userId: req.auth?.sub })
      res.json(TaskMap.toPersistence(task)).status(200)
    } catch (e) {
      if (e instanceof DomainError) {
        throw new HttpError(400, e.message)
      }

      throw e
    }
  }
}
