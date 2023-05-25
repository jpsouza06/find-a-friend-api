import { RequirementPet, Prisma } from '@prisma/client'

export interface RequirementPetRepository {
   findManyByPetId(petId: string, page: number): Promise<RequirementPet[]>
   findById(id: string): Promise<RequirementPet | null>
   create(data: Prisma.RequirementPetUncheckedCreateInput): Promise<RequirementPet>
}