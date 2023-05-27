import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetsByCityUseCase } from './list-pets-by-city'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: ListPetsByCityUseCase 

describe('List Pets By City Use Case', () => {
	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository()
		petsRepository = new InMemoryPetsRepository()
		sut = new ListPetsByCityUseCase(orgsRepository, petsRepository)
	})

	it('should be able to list pets by city', async () => {
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

		const org2 = await orgsRepository.create({
			name: 'org2',
			email: 'org2@example.com',
			state: 'state2',
			city: 'city2',
			street: 'street',
			cep: '123456',
			number: '31912345678',
			password_hash: await hash('123456', 6),
		})

		await petsRepository.create({
			name: 'pet1',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: org1.id  
		})

		await petsRepository.create({
			name: 'pet2',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: org1.id 
		})

		await petsRepository.create({
			name: 'pet3',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: org2.id 
		})
      

		const { pets } = await sut.execute({
			state: 'state1',
			city: 'city1',
			page: 1
		})	

		expect(pets).toEqual([
			expect.objectContaining({name: 'pet1'}),
			expect.objectContaining({name: 'pet2'})
		])
	})
})