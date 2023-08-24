import { makeListPetsByCharacteristicsUseCase } from '@/use-cases/factories/make-list-pets-by-characteristics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function list(request: FastifyRequest, reply: FastifyReply) {
	const listPetsParamsSchema = z.object({
		state: z.string(),
		city: z.string(),
		page: z.coerce.number().min(1).default(1),
		age: z.string().optional(),
		energy: z.string().optional(),
		size: z.string().optional(),
		independence: z.string().optional(),
	})

	const { state, city, page, age, energy, size, independence } = listPetsParamsSchema.parse(request.params)
	
	const listUseCase = makeListPetsByCharacteristicsUseCase()
	
	const {pets} = await listUseCase.execute({
		state, 
		city, 
		page, 
		age,
		energy, 
		size, 
		independence
	})

	return reply.status(200).send({
		pets
	})
}