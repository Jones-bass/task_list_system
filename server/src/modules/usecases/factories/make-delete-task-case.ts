import { PrismaTaskRepository } from '../../../repositories/prisma/prismaTaskRepository'
import { DeleteTaskUseCase } from '../deleteTaskUseCase'

export function makeDeleteTaskUseCase() {
  const deleteRepository = new PrismaTaskRepository()
  const deleteTaskUseCase = new DeleteTaskUseCase(deleteRepository)

  return deleteTaskUseCase
}
