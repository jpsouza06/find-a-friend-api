import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { CreatePhotoUseCase } from '../create-photo'

export function makeCreatePhotoUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const photosRepository = new PrismaPhotosRepository()
	const createPhotoUseCase = 
		new CreatePhotoUseCase(petsRepository, photosRepository)

	return createPhotoUseCase
}