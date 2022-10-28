import User from './User'
import { faker } from '@faker-js/faker'
import Role from './Role'

describe('User', () => {
  it('', async () => {
    const user = new User({
      name: faker.name.fullName(),
      role: Role.TECHNICIAN,
    })
    expect(user).not.toBeNull()
  })
})
