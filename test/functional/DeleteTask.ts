import supertest from 'supertest'
import app from '@app'
import { faker } from '@faker-js/faker'

type Task = {
  id: number
  summary: string
  user: string
}

describe('DELETE /tasks/:id', () => {
  let task: Task
  it('success', async () => {
    const respCreate = await supertest(app).post('/tasks').send({
      summary: faker.lorem.paragraphs(1),
      user: {
        name: faker.name.fullName(),
      },
    })

    task = respCreate.body

    const response = await supertest(app).del('/tasks/' + task.id).send()

    expect(response.status).toEqual(204)
    expect(response.type).toBe('application/json')
  })
})
