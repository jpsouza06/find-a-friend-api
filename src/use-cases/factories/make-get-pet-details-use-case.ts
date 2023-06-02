import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const getPetDetails = new GetPetDetailsUseCase(petsRepository)

	return getPetDetails
}