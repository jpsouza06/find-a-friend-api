import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const getPetsParamsSchema = z.object({
		petId: z.string().uuid()
	})

	const { petId } = getPetsParamsSchema.parse(request.params)
	
	const createUseCase = makeGetPetDetailsUseCase()
	
	const pet = await createUseCase.execute({
		petId
	})

	return reply.status(200).send({
		pet
	})
}