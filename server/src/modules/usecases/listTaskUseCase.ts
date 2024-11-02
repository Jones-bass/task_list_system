import { Task } from '@prisma/client';
import { TaskRepository } from '../../repositories/taskRepository';

interface ListTasksResponse {
  tasks: Task[];
}

export class ListTaskUseCase {
  constructor(private tasksRepository: TaskRepository) {}

  async execute(): Promise<ListTasksResponse> {
    const tasksFind = await this.tasksRepository.findAllTasks();
    return { tasks: tasksFind }; // Retorna todas as tarefas encontradas
  }
}
