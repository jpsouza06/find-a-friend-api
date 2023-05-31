import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { RequirementPetRepository } from '../requirements-pet-repository'

export class PrismaRequirementRepository implements RequirementPetRepository {
	async findManyByPetId(petId: string, page: number) {
		const requirements = await prisma.requirementPet.findMany({
			where: {
				pet_id: {
					contains: petId,
				}
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return requirements
	}
	async findById(id: string) {
		const requirement = await prisma.requirementPet.findUnique({
			where: {
				id,
			}
		})

		return requirement
	}
	async create(data: Prisma.RequirementPetUncheckedCreateInput) {
		const requirement = await prisma.requirementPet.create({
			data,
		})

		return requirement
	}
}