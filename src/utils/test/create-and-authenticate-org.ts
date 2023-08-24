import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function CreateAndAuthenticateOrgs(app: FastifyInstance) {
	const org = await prisma.org.create({
		data: {
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		}
	})

	const authResponse = await request(app.server)
		.post('/sessions')
		.send({
			email: 'org@example.com',
			password: '123456',
		})
     
	const { token } = authResponse.body

	return {
		token,
		org
	}
}