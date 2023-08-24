import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PhotosRepository } from '@/repositories/photos-repository'
import { RequirementPetRepository } from '@/repositories/requirements-pet-repository'

interface RegisterPetUseCaseCaseRequest {
   name: string;
   about: string;
   age: string;
	size: string;
	independence: string;
	energy: string;
	orgId: string;
	photos: Array<{
		height: number;
		width: number;
		url: string;
	}>;
	requirements: string[];	
}

interface RegisterPetUseCaseCaseResponse {
   pet: Pet;
}

export class RegisterPetUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private photosRepository: PhotosRepository,
		private requirementRepository: RequirementPetRepository,
		private orgsRepository: OrgsRepository
	) {}
	
	async execute({
		name,
		about,
		age,
		size,
		independence,
		energy,
		orgId,
		photos,
		requirements
	}: RegisterPetUseCaseCaseRequest): Promise<RegisterPetUseCaseCaseResponse> {

		const org = await this.orgsRepository.findById(orgId)
		
		if (!org) {
			throw new ResourceNotFoundError
		}

		const pet = await this.petsRepository.create({
			name,
			about,
			age,
			size,
			independence,
			energy,
			org_id: orgId,
		})

		photos.forEach(async (photo) => {
			await this.photosRepository.create({
				height: photo.height,
				width: photo.width,
				url: photo.url,
				pet_id: pet.id
			})
		})

		requirements.forEach(async (requirement) => {
			await this.requirementRepository.create({
				requirement,
				pet_id: pet.id
			})
		})

		return {
			pet
		}
	}
}