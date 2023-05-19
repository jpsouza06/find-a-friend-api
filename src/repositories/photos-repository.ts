import { Photos, Prisma } from '@prisma/client'

export interface PhotosRepository {
   findManyByPetId(petId: string, page: number): Promise<Photos[]>
   findById(id: string): Promise<Photos | null>
   create(data: Prisma.PhotosUncheckedCreateInput): Promise<Photos>
}