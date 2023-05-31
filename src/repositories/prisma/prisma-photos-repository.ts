import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PhotosRepository } from '../photos-repository'

export class PrismaPhotosRepository implements PhotosRepository {
	async findManyByPetId(petId: string, page: number) {
		const photos = await prisma.photos.findMany({
			where: {
				pet_id: {
					contains: petId,
				}
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return photos
	}
	async findById(id: string) {
		const photos = await prisma.photos.findUnique({
			where: {
				id,
			}
		})

		return photos
	}
	async create(data: Prisma.PhotosUncheckedCreateInput) {
		const photos = await prisma.photos.create({
			data,
		})

		return photos
	}
}