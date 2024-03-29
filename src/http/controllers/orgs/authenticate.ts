import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
	const authenticateUserBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})

	const { email, password } = authenticateUserBodySchema.parse(request.body)

	try {
		const authenticateUseCase = makeAuthenticateUseCase()
		const {org} = await authenticateUseCase.execute({
			email,
			password
		})

		const token = await reply.jwtSign(
			{
				sign: {
					sub: org.id
				}
			})

		const refreshToken = await reply.jwtSign(
			{
				sign: {
					sub: org.id,
					expiresIn: '7d'
				}
			})

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({
				token,
			})
	} catch (error) {
		if(error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message })
		}
      
		throw error
	}
}