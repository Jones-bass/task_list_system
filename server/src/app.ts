import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

import { env } from './env'

import { ZodError } from 'zod'
import { Router } from './router/router'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(Router)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
