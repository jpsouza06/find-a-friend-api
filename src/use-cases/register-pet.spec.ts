import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase 

describe('Register Org Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		petsRepository = new InMemoryPetsRepository()
		sut = new RegisterPetUseCase(petsRepository, orgsRepository)
	})

	it('should be able to register a pet', async () => {
		const org = await orgsRepository.create({
			name: 'org',
			email: 'org@example.com',
			address: 'addres',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		}) 

		const { pet } = await sut.execute({
			name: 'pet',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			orgId: org.id    
		})

		expect(pet.name).toEqual('pet')
	})
})