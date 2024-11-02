import { Prisma, Task } from '@prisma/client'

export interface TaskRepository {
  create(data: Prisma.TaskCreateInput): Promise<Task>
  findLastOrder(): Promise<Task | null>
  findAllTasks(): Promise<Task[]>
  deleteById(id: string): Promise<Task>


  findById(id: string): Promise<Task | null>
  update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> 
}
