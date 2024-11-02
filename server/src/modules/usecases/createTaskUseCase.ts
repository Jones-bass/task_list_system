import { Task } from '@prisma/client'
import { TaskRepository } from '../../repositories/taskRepository'
import { startOfHour } from 'date-fns'

interface RegisterUseCaseRequest {
  title: string
  cost: number
  deadline: Date
  
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    cost,
    deadline,
  }: RegisterUseCaseRequest): Promise<Task> {
    const scheduleDate = startOfHour(deadline);

    const lastTask = await this.taskRepository.findLastOrder();
    const order = (lastTask?.order ?? 0) + 1; 
    
    const createTask = await this.taskRepository.create({
      title,
      cost,
      deadline: scheduleDate.toISOString(),
      order,
    });

    return createTask;
  }
}
