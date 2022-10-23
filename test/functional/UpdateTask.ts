import supertest from 'supertest'
import app from '@app'
import { faker } from '@faker-js/faker'

type Task = {
  id: number
  summary: string
  user: string
}

describe('PUT /tasks:id', () => {
  let task: Task
  beforeAll(async () => {
    const responseCreate = await supertest(app).post('/tasks').send({
      summary: faker.lorem.paragraphs(1),
      user: {
        name: faker.name.fullName(),
      },
    })
    task = responseCreate.body
  })

  it('summary with more than 2500 characters', async () => {
    const response = await supertest(app).put('/tasks/' + task.id).send({
      summary: faker.lorem.paragraphs(200),
    })
    expect(response.status).toEqual(400)
    expect(response.body).toStrictEqual({ 'message': 'the summary is more than 2500 characters' })
  })

  it('success', async () => {
    const response = await supertest(app).put('/tasks/' + task.id).send({
      summary: faker.lorem.paragraphs(1),
    })

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
  })
})
