import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterPetUseCaseCaseRequest {
   name: string;
   about: string;
   age: string;
	size: string;
	independence: string;
	orgId: string;
}

interface RegisterPetUseCaseCaseResponse {
   pet: Pet;
}

export class RegisterPetUseCase{
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository
	) {}
	
	async execute({
		name,
		about,
		age,
		size,
		independence,
		orgId
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
			org_id: orgId
		})

		return {
			pet,
		}
	}
}