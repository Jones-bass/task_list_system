import { PrismaTaskRepository } from '../../../repositories/prisma/prismaTaskRepository'
import { CreateTaskUseCase } from '../createTaskUseCase'

export function makeCreateTaskUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const registerTaskUseCase = new CreateTaskUseCase(taskRepository)

  return registerTaskUseCase
}
