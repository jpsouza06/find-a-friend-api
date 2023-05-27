import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePhotoUseCase } from './create-photo'

let petsRepository: InMemoryPetsRepository
let photosRepository: InMemoryPhotosRepository
let sut: CreatePhotoUseCase 

describe('Create Photo Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()
		photosRepository = new InMemoryPhotosRepository()
		sut = new CreatePhotoUseCase(petsRepository, photosRepository)
	})

	it('should be able to create a photo', async () => {
		const pet = await petsRepository.create({
			name: 'pet',
			about: 'pet',      
			age: '1',
			size: 'small',
			independence: 'low',
			energy: 'low',
			org_id: 'org'   
		})
      
		const { photo } = await sut.execute({
			height: 10,
			width: 10,
			url: '/url',
			petId: pet.id
		})

		expect(photo.url).toEqual('/url')
	})

})