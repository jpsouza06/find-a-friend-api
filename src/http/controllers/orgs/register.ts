import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		cep: z.string(),
		state: z.string(),
		city: z.string(),
		street: z.string(),
		number: z.string(),
		password: z.string().min(6),
	})

	const { 
		name, email, cep, state, city, street, number, password 
	} = registerBodySchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterUseCase()
      
		await registerUseCase.execute({
			name,
			email,
			cep,
			state,
			city,
			street,
			number,
			password
		})
	} catch (error) {
		if(error instanceof OrgAlreadyExistsError) {
			return reply.status(409).send({ message: error.message })
		}
      
		throw error
	}

	return reply.status(201).send()
}