import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to register', async () => {
		const response = await request(app.server)
			.post('/orgs')
			.send({
				name: 'org',
				email: 'org@example.com',
				state: 'state',
				city: 'city',
				street: 'street',
				cep: '123456',
				number: '31912345678',
				password: '123456'
			})
		console.log(response.body)
		expect(response.statusCode).toEqual(201)
	})
})