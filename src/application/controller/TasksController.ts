import { Request, Response } from 'express'
import HttpError from '@app/HttpError'
import Task, { CreateTaskUseCase, ListTasksUseCase } from '@domain/tasks'

export default class TasksController {
  constructor (
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly listTaskUseCase: ListTasksUseCase,
  ) {}

  async createTask (req: Request, res: Response): Promise<void> {
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

  async listTasks (_req: Request, res: Response): Promise<void> {
    const tasks = await this.listTaskUseCase.handle()
    res.json(tasks)
    res.status(200)
  }
}
