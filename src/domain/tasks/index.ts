import CreateTaskUseCase, { CreateTaskRepository, TaskCreated } from './createTask'
import DeleteTaskUseCase, { DeleteTaskRepository } from './deleteTask'
import ListTasksUseCase, { ListTasksRepository } from './listTasks'
import UpdateTaskUseCase, { UpdateTaskRepository } from './updateTask'
import Task from './Task'

export default Task

export {
  CreateTaskUseCase,
  ListTasksUseCase,
  DeleteTaskUseCase,
  UpdateTaskUseCase,
  CreateTaskRepository,
  ListTasksRepository,
  DeleteTaskRepository,
  UpdateTaskRepository,
  TaskCreated,
}
