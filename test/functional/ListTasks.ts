import supertest from 'supertest'
import app from '@app'

describe('GET /tasks', () => {
  it('success', async () => {
    const response = await supertest(app).get('/tasks').send()

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toStrictEqual([])
  })
})
