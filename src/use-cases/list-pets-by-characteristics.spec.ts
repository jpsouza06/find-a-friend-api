import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetsByCharacteristicsUseCase } from './list-pets-by-characteristics'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: ListPetsByCharacteristicsUseCase 

describe('List Pets By Characteristics Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		petsRepository = new InMemoryPetsRepository()
		sut = new ListPetsByCharacteristicsUseCase(orgsRepository, petsRepository)
	})

	it('should be able to list pets by characteristics', async () => {
		const org1 = await orgsRepository.create({
			name: 'org1',
			email: 'org1@example.com',
			state: 'state1',
			city: 'city1',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		})

		await petsRepository.create({
			name: 'pet1',
			about: 'pet-small',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: org1.id  
		})

		await petsRepository.create({
			name: 'pet2',
			about: 'pet-large',      
			age: '5',
			energy: 'high',
			size: 'large',
			independence: 'high',
			org_id: org1.id 
		})

		const { pets } = await sut.execute({
			state: 'state1',
			city: 'city1',
			page: 1,
			energy: 'high',
			age: '5',
			size: 'large',
			independence: 'high'	
		})	

		expect(pets).toEqual([
			expect.objectContaining({name: 'pet2'})
		])
	})
})