import { Prisma, Task } from '@prisma/client'

export interface TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  findLastOrder(): Promise<Task | null>
  findAllTasks(): Promise<Task[]>
}
