import { PrismaTaskRepository } from '../../../repositories/prisma/prismaTaskRepository'
import { EditTaskUseCase } from '../editTaskUseCase'

export function makeEditTaskUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const editTaskUseCase = new EditTaskUseCase(taskRepository)

  return editTaskUseCase
}
