import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'
import { InMemoryRequirementPetRepository } from '@/repositories/in-memory/in-memory-requirement-pet-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'

let orgsRepository: InMemoryOrgsRepository
let photosRepository: InMemoryPhotosRepository
let requirementRepository: InMemoryRequirementPetRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase 

describe('Register Pet Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		photosRepository = new InMemoryPhotosRepository()
		requirementRepository = new InMemoryRequirementPetRepository()
		petsRepository = new InMemoryPetsRepository()
		sut = new RegisterPetUseCase(petsRepository, photosRepository, requirementRepository, orgsRepository)
	})

	it('should be able to register a pet', async () => {
		const org = await orgsRepository.create({
			name: 'org',
			email: 'org@example.com',
			state: 'state',
			city: 'city',
			street: 'street',
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
			orgId: org.id,
			photos: [
				{
					height: 10,
					width: 10,
					url: '/url'
				},
				{
					height: 10,
					width: 10,
					url: '/url'
				}
			],
			requirements: [
				'requirement1', 'requirement2'
			] 
		})

		expect(pet.name).toEqual('pet')
	})
})