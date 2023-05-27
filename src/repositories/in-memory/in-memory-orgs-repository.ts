import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = []

	async findById(id: string) {
		const org = this.items.find(item => item.id === id)

		if (!org) {
			return null
		}

		return org
	}

	async findByEmail(email: string) {
		const org = this.items.find(item => item.email = email)

		if (!org) {
			return null
		}

		return org
	}

	async searchManyByCity(state: string, city: string) {
		return this.items
			.filter(item => item.state.includes(state))
			.filter(item => item.city.includes(city))
	}
   
	async create(data: Prisma.OrgCreateInput) {
		const org = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			cep: data.cep,
			state: data.state,
			city: data.city,
			street: data.street,
			number: data.number,
			password_hash: data.password_hash,
			created_at: new Date()
		}

		this.items.push(org)

		return org
	}
}