import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaRequirementRepository } from '@/repositories/prisma/prisma-requirement-repository'
import { CreateRequirementPetUseCase } from '../create-requirement-pet'

export function makeCreateRequirementPetUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const requirementRepository = new PrismaRequirementRepository()
	const createRequirementPetUseCase = new CreateRequirementPetUseCase(petsRepository, requirementRepository)

	return createRequirementPetUseCase
}