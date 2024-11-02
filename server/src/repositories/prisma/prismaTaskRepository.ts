import { Prisma, Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { TaskRepository } from '../taskRepository'

export class PrismaTaskRepository implements TaskRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const createTask = await prisma.task.create({ data })
    return createTask
  }

  async findLastOrder(): Promise<Task | null> {
    return await prisma.task.findFirst({
      orderBy: {
        order: 'desc',
      },
    });
  }
  
  async findAllTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      orderBy: {
        order: 'asc', 
      },
    })
    return tasks
  }
}


