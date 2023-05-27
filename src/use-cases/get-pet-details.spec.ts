import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetDetailsUseCase } from './get-pet-details'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase 

describe('Get Pet Details Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		sut = new GetPetDetailsUseCase(petsRepository)
	})

	it('should be able to get details of a pet', async () => {
		const createdPet = await petsRepository.create({
			name: 'pet',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: 'org-id'  
		})

		const { pet } = await sut.execute({
			petId: createdPet.id
		})

		expect(pet.id).toEqual(expect.any(String))
		expect(pet.name).toEqual('pet')
	})

	it('should not be able to get details of a pet with wrong id,', async () => {
		await expect(() => sut.execute({
			petId: 'non-existing-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})