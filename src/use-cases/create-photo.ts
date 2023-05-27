import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { Photos } from '@prisma/client'
import { PhotosRepository } from '@/repositories/photos-repository'

interface CreatePhotoUseCaseCaseRequest {
   height: number;
   width: number;
   url: string;
   petId: string;
}

interface CreatePhotoUseCaseCaseResponse {
   photo: Photos;
}

export class CreatePhotoUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private createPhotosRepository: PhotosRepository
	) {}
	
	async execute({
		height,
		width,
		url,
		petId
	}: CreatePhotoUseCaseCaseRequest): Promise<CreatePhotoUseCaseCaseResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new ResourceNotFoundError
		}

		const photo = await this.createPhotosRepository.create({
			height,
			width,
			url,
			pet_id: petId
		})

		return {
			photo,
		}
	}
}