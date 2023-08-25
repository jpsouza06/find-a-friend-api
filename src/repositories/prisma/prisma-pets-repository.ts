import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			}
		})

		return pet
	}

	async findManyByOrg(orgId: string, page: number) {
		const pets = await prisma.pet.findMany({
			where: {
				org_id: orgId,
			},
			take: 20,
			skip: (page - 1) * 20,
		}) 

		return pets
	}

	async findManyByCharacteristics(
		orgId: string,
		page: number, 
		age?: string, 
		energy?: string, 
		size?: string, 
		independence?: string
	) {

		const pets = await prisma.pet.findMany({
			where: {
				org_id: orgId,
				...(age && { age: { contains: age } }),
				...(energy && { energy: { contains: energy } }),
				...(size && { size: { contains: size } }),
				...(independence && { independence: { contains: independence } })
			},
			take: 20,
			skip: (page - 1) * 20
		})

		return pets
	}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		})

		return pet
	}
}