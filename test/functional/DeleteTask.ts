import supertest from 'supertest'
import app from '@app'

describe('GET /tasks', () => {
  it('success', async () => {
    const response = await supertest(app).del('/tasks').send({
      id: 1,
    })

    expect(response.status).toEqual(204)
    expect(response.type).toBe('application/json')
  })
})
