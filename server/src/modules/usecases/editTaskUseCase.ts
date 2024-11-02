import { Task } from '@prisma/client';
import { TaskRepository } from '../../repositories/taskRepository';
import { startOfHour } from 'date-fns';

interface UpdateTaskRequest {
  id: string;
  title?: string;
  cost?: number;
  deadline?: Date;
}

export class EditTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    cost,
    deadline,
  }: UpdateTaskRequest): Promise<Task | null> {

    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    // Ajusta a data para a hora cheia, se fornecida
    const scheduleDate = deadline ? startOfHour(deadline) : undefined;

    const updatedTask = await this.taskRepository.update(id, {
      title,
      cost,
      deadline: scheduleDate, 
    });

    return updatedTask;
  }
}
