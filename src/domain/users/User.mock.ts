import User from './User'
import Role from './Role'
import { faker } from '@faker-js/faker'

const newUserFake = (role: Role): User => (new User({
  id: faker.datatype.number(),
  name: faker.name.fullName(),
  role: role,
}))

export default newUserFake
