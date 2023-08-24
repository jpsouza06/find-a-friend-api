import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to refresh a token', async () => {
		await request(app.server)
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

		const authResponse = await request(app.server)
			.post('/sessions')
			.send({
				email: 'org@example.com',
				password: '123456',
			})

		const cookies = authResponse.get('Set-Cookie')

		const response = await request(app.server)
			.patch('/token/refresh')
			.set('Cookie', cookies)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
		expect(response.get('Set-Cookie')).toEqual([
			expect.stringContaining('refreshToken='),
		])
	})
})