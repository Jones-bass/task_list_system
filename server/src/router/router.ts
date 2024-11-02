import { FastifyInstance } from 'fastify'
import { CreateTaskController } from '../modules/controller/createTaskController'
import { ListTaskController } from '../modules/controller/listTaskController'
import { DeleteTaskController } from '../modules/controller/deleteTaskController'

export async function Router(app: FastifyInstance) {
  app.post('/task', CreateTaskController)
  app.get('/task', ListTaskController)
  app.delete('/task/:id', DeleteTaskController)
}
