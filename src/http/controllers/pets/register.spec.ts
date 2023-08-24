import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { CreateAndAuthenticateOrgs } from '@/utils/test/create-and-authenticate-org'

describe('Register pet (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to register a pet', async () => {
		const { token } = await CreateAndAuthenticateOrgs(app)
		
		const response = await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'pet',
				about: 'pet',       
				age: '1',
				size: 'small',
				independence: 'low',
				energy: 'low',
				photos: [
					{
						height: 12,
						width: 12,
						url: 'url'
					},
					{
						height: 12,
						width: 12,
						url: 'url'
					}
				],
				requirements: ['requiriment1', 'requiriment2'],
			})

		expect(response.statusCode).toEqual(201)
	})
})