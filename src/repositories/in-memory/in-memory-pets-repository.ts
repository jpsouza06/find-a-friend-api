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

	async findManyByOrg(orgId: string, page: number) {
		return this
			.items.filter((item) => item.org_id === orgId)
			.slice((page - 1) * 20, page * 20)
	}

	async findManyByCharacteristics(
		orgId: string, 
		page: number,
		age?: string, 
		energy?: string, 
		size?: string, 
		independence?: string,

	) {
		console.log(age)
		return this
			.items.filter((item) => item.org_id === orgId)
			.filter((item) =>  age ? item.age === age : true)
			.filter((item) => energy ? item.energy === energy : true)
			.filter((item) => size ? item.size === size : true)
			.filter((item) => independence ? item.independence === independence : true)
			.slice((page - 1) * 20, page * 20)
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