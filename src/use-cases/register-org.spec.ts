import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase 

describe('Register Org Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		sut = new RegisterOrgUseCase(orgsRepository)
	})

	it('should be able to register a org', async () => {
		const { org } = await sut.execute({
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password: '123456',
		})

		expect(org.name).toEqual('org')
	})

	it('should hash org password upon registration', async () => {
		const { org } = await sut.execute({
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password: '123456'
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			org.password_hash
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		const email = 'johndoe@example.com'

		await sut.execute({
			name: 'org',
			email,
			state: 'state',
			city: 'city',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password: '123456'
		})

		await expect(() =>
			sut.execute({
				name: 'org',
				email,
				state: 'state',
				city: 'city',
				street: 'street',
				cep: '123456',
				number: '31912345678',
				password: '123456'
			})
		).rejects.toBeInstanceOf(OrgAlreadyExistsError)
	})
})