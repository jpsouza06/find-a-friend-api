import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository{
	public items: Pet[] = []

	async findById(id: string){
		const pet = this.items.find(item => item.id === id)

		if (!pet) {
			return null
		}

		return pet
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: data.id ?? randomUUID(),
			name: data.name,
			about: data.about,
			age: data.age,
			size: data.size,
			independence: data.independence,
			energy: data.energy,
			org_id: data.org_id
		}

		this.items.push(pet)

		return pet	
	}
}