import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { parseISO } from 'date-fns';

import { makeEditTaskUseCase } from '../usecases/factories/make-edit-task-case';

export async function EditTaskController(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskParamsSchema = z.object({
    id: z.string(), 
  });

  const updateTaskBodySchema = z.object({
    title: z.string().optional(),
    cost: z.number().optional(),
    deadline: z.string().optional(),
  });

  const { id } = updateTaskParamsSchema.parse(request.params); 
  const { title, cost, deadline } = updateTaskBodySchema.parse(request.body); 
  const parsedDate = deadline ? parseISO(deadline) : undefined

  try {
    const updateTaskUseCase = makeEditTaskUseCase();

    const updatedTask = await updateTaskUseCase.execute({
      id,
      title,
      cost,
      deadline: parsedDate, 
    });

    return reply.status(200).send({ task: updatedTask });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
