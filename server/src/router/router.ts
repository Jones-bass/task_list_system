import { FastifyInstance } from 'fastify'
import { CreateTaskController } from '../modules/controller/createTaskController'
import { ListTaskController } from '../modules/controller/listTaskController'

export async function Router(app: FastifyInstance) {
  app.post('/task', CreateTaskController)
  app.get('/task', ListTaskController)

}
