import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryRequirementPetRepository } from '@/repositories/in-memory/in-memory-requirement-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateRequirementPetUseCase } from './create-requirement-pet'

let petsRepository: InMemoryPetsRepository
let requirementPetRepository: InMemoryRequirementPetRepository
let sut: CreateRequirementPetUseCase 

describe('Create Requirement Pet Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		requirementPetRepository = new InMemoryRequirementPetRepository()
		sut = new CreateRequirementPetUseCase(petsRepository, requirementPetRepository)
	})

	it('should be able to create a requirement', async () => {
		const pet = await petsRepository.create({
			name: 'pet',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: 'org'   
		})
		const { requirementCreated } = await sut.execute({
			requirement: 'requirement',
			petId: pet.id
		})

		expect(requirementCreated.requirement).toEqual('requirement')
	})

})