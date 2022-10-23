import { Request, Response } from 'express'
import HttpError from '@app/HttpError'
import Task, { CreateTaskUseCase } from '@domain/tasks'

export default class TasksController {
  constructor (
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {}

  async createTasks (req: Request, res: Response): Promise<void> {
    let task: Task
    try {
      task = new Task(req.body.summary, req.body.user.name)
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpError(400, e.message)
      }
      throw e
    }

    task = await this.createTaskUseCase.handle(task)
    res.json(task)
    res.status(200)
  }
}
