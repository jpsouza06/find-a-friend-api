import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { get } from './get'
import { list } from './list'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJwt)

	app.post('/pets', register)
	app.get('/pets/:petId', get)
	app.get('/pets/list', list)
}