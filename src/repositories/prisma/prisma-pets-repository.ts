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
		age?: string | undefined, 
		energy?: string | undefined, 
		size?: string | undefined, 
		independence?: string | undefined
	) {
		const pets = await prisma.pet.findMany({
			where: {
				org_id: orgId,
				age : {
					contains: age,
				},
				energy : {
					contains: energy,
				},
				size : {
					contains: size,
				},
				independence : {
					contains: independence,
				}
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