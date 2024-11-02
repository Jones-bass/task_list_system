import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateTaskUseCase } from '../usecases/factories/make-create-task-case';
import { parseISO } from 'date-fns';

export async function CreateTaskController(request: FastifyRequest, reply: FastifyReply) {
  const registerTaskSchema = z.object({
    title: z.string(),
    cost: z.number(),
    deadline: z.string(),
  });

  const { title, cost, deadline } = registerTaskSchema.parse(request.body);
  const parsedDate = parseISO(deadline);

  try {
    const registerTaskUseCase = makeCreateTaskUseCase();

    const task = await registerTaskUseCase.execute({
      title,
      cost,
      deadline: parsedDate,
    });

    return reply.status(200).send({ task });
  } catch (err) {
    return reply.status(500).send({ message: 'Internal Server Error' });
  }
}
