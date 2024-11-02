import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeDeleteTaskUseCase } from '../usecases/factories/make-delete-task-case';

export async function DeleteTaskController(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskSchema = z.object({
    id: z.string().uuid(), 
  });

  const { id } = deleteTaskSchema.parse(request.params);

  try {
    const deleteTaskUseCase = makeDeleteTaskUseCase();
    await deleteTaskUseCase.execute({ id });

    return reply.status(200).send({ message: 'Tarefa deletada com sucesso.' });
  } catch (err) {
    return reply.status(500).send({ message: 'Erro ao deletar a tarefa.' });
  }
}
