import { Requirement, Prisma } from '@prisma/client'

export interface RequirementRepository {
   findManyByPetId(petId: string, page: number): Promise<Requirement[]>
   findById(id: string): Promise<Requirement | null>
   create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>
}