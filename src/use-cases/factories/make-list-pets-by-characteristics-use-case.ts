import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsByCharacteristicsUseCase } from '../list-pets-by-characteristics'

export function makeListPetsByCharacteristicsUseCase() {
	const orgsRepository = new PrismaOrgsRepository()
	const petsRepository = new PrismaPetsRepository()
	const listPetsByCharacteristicsUseCase = 
      new ListPetsByCharacteristicsUseCase(orgsRepository, petsRepository)

	return listPetsByCharacteristicsUseCase
}