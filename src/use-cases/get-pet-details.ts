import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface GetPetDetailsUseCaseCaseRequest {
   petId: string;
}

interface GetPetDetailsUseCaseCaseResponse {
   pet: Pet;
}

export class GetPetDetailsUseCase{
	constructor(
		private petsRepository: PetsRepository,
	) {}
	
	async execute({
		petId
	}: GetPetDetailsUseCaseCaseRequest): Promise<GetPetDetailsUseCaseCaseResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new ResourceNotFoundError
		}

		return {
			pet,
		}
	}
}