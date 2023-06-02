import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsByCityUseCase } from '../list-pets-by-city'

export function makeListPetsByCharacteristicsUseCase() {
	const orgsRepository = new PrismaOrgsRepository()
	const petsRepository = new PrismaPetsRepository()
	const listPetsByCityUseCase = 
      new ListPetsByCityUseCase(orgsRepository, petsRepository)

	return listPetsByCityUseCase
}