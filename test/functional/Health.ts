import supertest from 'supertest'
import app from '@app'

describe('GET /health', () => {
  it('success', async () => {
    const response = await supertest(app).get('/health').send()

    expect(response.status).toEqual(200)
    expect(response.body.im).toBe(true)
  })
})
