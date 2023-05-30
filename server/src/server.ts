import 'dotenv/config'

import fastify from 'fastify'
import { memoriesRoutes } from './routes/memory'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { PrismaClient } from '@prisma/client'
import { authRoutes } from './routes/auth'

const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async () => {
  const users = await prisma.user.findMany()

  return users
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0', // necessário para requisições do mobile.
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
