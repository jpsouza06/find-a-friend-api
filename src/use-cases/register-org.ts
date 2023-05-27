import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseCaseRequest {
   name: string;
   email: string;
   cep: string;
	state: string;
	city: string;
	street: string;
   number: string;
	password: string;
}

interface RegisterOrgUseCaseCaseResponse {
   org: Org;
}

export class RegisterOrgUseCase{
	constructor(private orgsRepository: OrgsRepository) {}
	
	async execute({
		name,
		email,
		cep,
		state,
		city,
		street,
		number,
		password,
	}: RegisterOrgUseCaseCaseRequest): Promise<RegisterOrgUseCaseCaseResponse> {
		const password_hash = await hash(password, 6)

		const orgsWithSameEmail = await this.orgsRepository.findByEmail(email)

		if (orgsWithSameEmail) {
			throw new OrgAlreadyExistsError()
		}

		const org = await this.orgsRepository.create({
			name,
			email,
			cep,
			state,
			city,
			street,
			number,
			password_hash
		})

		return {
			org,
		}
	}
}