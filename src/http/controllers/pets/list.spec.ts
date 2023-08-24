import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { CreateAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('List Snack (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to list pets', async () => {
		const { token, org } = await CreateAndAuthenticateOrgs(app)

		await prisma.pet.create({
			data: 
				{
					name: 'pet1',
					about: 'pet',       
					age: '1',
					size: 'small',
					independence: 'low',
					energy: 'low',
					org_id: org.id
				}
		})

		const response = await request(app.server)
			.get('/pets/list')
			.set('Authorization', `Bearer ${token}`)
			.send() 
		expect(response.statusCode).toEqual(200)
		expect(response.body.pets).toHaveLength(2)
		expect(response.body.pets).toEqual([
			expect.objectContaining({
				org_id: org.id,
			}),
			expect.objectContaining({
				org_id: org.id,
			})
		])
	})
})