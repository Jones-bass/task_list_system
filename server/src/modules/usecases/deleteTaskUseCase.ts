import { TaskRepository } from '../../repositories/taskRepository';

interface DeleteTaskRequest {
  id: string;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskRequest): Promise<void> {
    await this.taskRepository.deleteById(id);
  }
}
