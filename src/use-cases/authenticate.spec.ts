import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach} from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new AuthenticateUseCase(orgsRepository)
	})
	it('should be able to authenticate', async () => {
		await orgsRepository.create({
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		})

		const { org } = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})

		expect(org.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		await expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await orgsRepository.create({
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		})

		await expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '123123'
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})