import { RequirementPet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { RequirementPetRepository } from '../requirements-pet-repository'

export class InMemoryRequirementPetRepository implements RequirementPetRepository{
	public items: RequirementPet[] = []

	async findManyByPetId(petId: string, page: number) {
		return this.items
			.filter(item => item.pet_id === petId)
			.slice((page -1) * 20, page * 20)   
	}

	async findById(id: string) {
		const requirement = this.items.find(item => item.id === id)

		if (!requirement) {
			return null
		}

		return requirement
	}

	async create(data: Prisma.RequirementPetUncheckedCreateInput) {
		const requirement = {
			id: data.id ?? randomUUID(),
			requirement: data.requirement,
			pet_id: data.pet_id
		}
		this.items.push(requirement)

		return requirement		
	}
}