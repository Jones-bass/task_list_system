import { Prisma, Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { TaskRepository } from '../taskRepository'

export class PrismaTaskRepository implements TaskRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const createTask = await prisma.task.create({ data })
    return createTask
  }
}
