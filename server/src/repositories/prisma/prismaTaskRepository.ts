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

  async deleteById(id: string): Promise<Task> {
    const deleteTask = await prisma.task.delete({
      where: { id },
    })
    return deleteTask
  }

  async findById(id: string): Promise<Task | null> {
    const findID = await prisma.task.findUnique({
      where: { id }
    });
    return findID
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });
    return updatedTask;
  }
}

