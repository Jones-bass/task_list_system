import { FastifyInstance } from 'fastify'
import { CreateTaskController } from '../modules/controller/createTaskController'
import { ListTaskController } from '../modules/controller/listTaskController'
import { DeleteTaskController } from '../modules/controller/deleteTaskController'
import { EditTaskController } from '../modules/controller/editTaskController'

export async function Router(app: FastifyInstance) {
  app.post('/task', CreateTaskController)
  app.get('/task', ListTaskController)
  app.delete('/task/:id', DeleteTaskController)
  app.put('/task/:id', EditTaskController); 
}
