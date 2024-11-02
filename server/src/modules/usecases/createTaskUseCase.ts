import { Task } from '@prisma/client'
import { TaskRepository } from '../../repositories/taskRepository'
import { startOfHour } from 'date-fns'

interface RegisterUseCaseRequest {
  title: string
  cost: number
  deadline: Date
  order: number
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    cost,
    deadline,
    order,
  }: RegisterUseCaseRequest): Promise<Task> {
    const scheduleDate = startOfHour(deadline);

    const createTask = await this.taskRepository.create({
      title,
      cost,
      deadline: scheduleDate.toISOString(),
      order,
    })

    return createTask 
  }
}
