import { Photos, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PhotosRepository } from '../photos-repository'

export class InMemoryPhotosRepository implements PhotosRepository {
	public items: Photos[] = []
   
	async findManyByPetId(petId: string, page: number) {
		return this.items
			.filter(item => item.pet_id === petId)
			.slice((page -1) * 20, page * 20) 
	}

	async findById(id: string) {
		const photo = this.items.find(item => item.id === id)

		if (!photo) {
			return null
		}

		return photo
	}
	async create(data: Prisma.PhotosUncheckedCreateInput) {
		const photo = {
			id: data.id ?? randomUUID(),
			height: data.height,
			width: data.width,
			url: data.url,
			pet_id: data.pet_id
		}

		this.items.push(photo)

		return photo	
	}
}