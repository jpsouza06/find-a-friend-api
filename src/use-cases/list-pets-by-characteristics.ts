import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ListPetsByCharacteristicsUseCaseCaseRequest {
   state: string;
   city: string;
	page: number;
   age?: string;
   energy?: string;
   size?: string;
   independence?: string;
}  

interface ListPetsByCharacteristicsUseCaseCaseResponse {
   pets: Pet[];
}

export class ListPetsByCharacteristicsUseCase{
	constructor(
      private orgsRepository: OrgsRepository,
		private petsRepository: PetsRepository
	) {}
	
	async execute({
		state,
		city,
		page,
		age,
		energy,
		size,
		independence
	}: ListPetsByCharacteristicsUseCaseCaseRequest): Promise<ListPetsByCharacteristicsUseCaseCaseResponse> {
		const orgs = await this.orgsRepository.searchManyByCity(state, city)

		if (!orgs) {
			throw new ResourceNotFoundError()
		}

		const pets: Pet[] = []
		orgs.forEach(async org => {
			const pet = await this.petsRepository.findManyByCharacteristics(
				org.id, 
				page,
				age,
				energy,
				size,
				independence,
			)

			pet.forEach(item => pets.push(item))
		})

		return {
			pets,
		}
	}
}