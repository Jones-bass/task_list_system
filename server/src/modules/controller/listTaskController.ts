import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListTaskUseCase } from '../usecases/factories/make-list-task-case'

export async function ListTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listasksUseCase = makeListTaskUseCase()

  const { tasks } = await listasksUseCase.execute()

  return reply.status(200).send({ tasks })
}
