import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Get Snack (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to get a pet', async () => {
		const { token, org } = await CreateAndAuthenticateOrgs(app)

		const pet = await prisma.pet.create({
			data: {
				name: 'pet',
				about: 'pet',       
				age: '1',
				size: 'small',
				independence: 'low',
				energy: 'low',
				org_id: org.id
			}
		})

		const response = await request(app.server)
			.get(`/pets/${pet.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send() 
		expect(response.statusCode).toEqual(200)
	})
})