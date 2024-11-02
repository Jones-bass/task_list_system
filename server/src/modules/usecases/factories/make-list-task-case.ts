import { PrismaTaskRepository } from "../../../repositories/prisma/prismaTaskRepository"
import { ListTaskUseCase } from "../listTaskUseCase"

export function makeListTaskUseCase() {
  const tasksRepository = new PrismaTaskRepository()
  const listtaskUseCase = new ListTaskUseCase(tasksRepository)

  return listtaskUseCase
}
