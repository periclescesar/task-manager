import supertest from 'supertest'
import app from '@app'
import { faker } from '@faker-js/faker'

describe('POST /tasks', () => {
  it('summary with more than 2500 characters', async () => {
    const response = await supertest(app).post('/tasks').send({
      summary: faker.lorem.paragraphs(200),
      user: {
        name: faker.name.fullName(),
      }
    })
    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({"message": "the summary is more than 2500 characters"})
  })

  it('success', async () => {
    const response = await supertest(app).post('/tasks').send({
      summary: faker.lorem.paragraphs(1),
      user: {
        name: faker.name.fullName(),
      }
    })

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
  })
})
