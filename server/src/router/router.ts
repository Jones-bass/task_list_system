import { FastifyInstance } from 'fastify'
import { CreateTaskController } from '../modules/controller/createTaskController'

export async function Router(app: FastifyInstance) {
  app.post('/task', CreateTaskController)
}
