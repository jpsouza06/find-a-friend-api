import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ListPetsByCityUseCaseCaseRequest {
   state: string;
   city: string;
   page: number;
}

interface ListPetsByCityUseCaseCaseResponse {
   pets: Pet[];
}

export class ListPetsByCityUseCase{
	constructor(
      private orgsRepository: OrgsRepository,
		private petsRepository: PetsRepository
	) {}
	
	async execute({
		state,
		city,
		page
	}: ListPetsByCityUseCaseCaseRequest): Promise<ListPetsByCityUseCaseCaseResponse> {
		const orgs = await this.orgsRepository.searchManyByCity(state, city)

		if (!orgs) {
			throw new ResourceNotFoundError()
		}

		const pets: Pet[] = []
		orgs.forEach(async org => {
			const pet = await this.petsRepository.findManyByOrg(org.id, page)

			pet.forEach(item => pets.push(item))
		})

		return {
			pets,
		}
	}
}