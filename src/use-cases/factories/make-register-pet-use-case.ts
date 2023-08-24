import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const photosRepository = new PrismaPhotosRepository()
	const requirementRepository = new PrismaRequirementRepository()
	const orgsRepository = new PrismaOrgsRepository()
	const registerPetUseCase = 
      new RegisterPetUseCase(petsRepository, photosRepository, requirementRepository, orgsRepository)

	return registerPetUseCase
}