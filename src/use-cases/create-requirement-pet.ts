import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { RequirementPet } from '@prisma/client'
import { RequirementPetRepository } from '@/repositories/requirements-pet-repository'

interface CreateRequirementPetUseCaseCaseRequest {
   requirement: string;
   petId: string;
}

interface CreateRequirementPetUseCaseCaseResponse {
   requirementCreated: RequirementPet;
}

export class CreateRequirementPetUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private requirementPetRepository: RequirementPetRepository
	) {}
	
	async execute({
		requirement,
		petId
	}: CreateRequirementPetUseCaseCaseRequest): Promise<CreateRequirementPetUseCaseCaseResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new ResourceNotFoundError
		}

		const requirementCreated = await this.requirementPetRepository.create({
			requirement,
			pet_id: petId
		})

		return {
			requirementCreated,
		}
	}
}