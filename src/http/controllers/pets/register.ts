import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register (request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(),
		about: z.string(),
		age: z.string(),
		size: z.string(),
		independence: z.string(),
		energy: z.string(),
		photos: z.array(z.object({
			height: z.number(),
			width: z.number(),
			url: z.string(),
		})),
		requirements: z.array(z.string())
	})

	const { 
		name, about, age, size, independence, energy, photos, requirements
	} = registerBodySchema.parse(request.body)

	try {
		const registerUseCase = makeRegisterPetUseCase()
      
		await registerUseCase.execute({
			name,
			about,
			age,
			size,
			independence,
			energy,
			orgId: request.user.sign.sub,
			photos,
			requirements
		})
	} catch (error) {
		if(error instanceof ResourceNotFoundError) {
			return reply.status(409).send({ message: error.message })
		}
      
		throw error
	}

	return reply.status(201).send()
}