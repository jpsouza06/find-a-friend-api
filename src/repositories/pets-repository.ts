import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
   findById(id: string): Promise<Pet | null>
   findManyByOrg(orgId: string, page: number): Promise<Pet[]>
   findManyByCharacteristics(
      orgId: string,
      page: number,
      age?: string,
      energy?: string,
      size?: string,
      independence?: string
   ): Promise<Pet[]>
   
   create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}