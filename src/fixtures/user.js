import faker from 'faker'

const avatarUrl = `https://randomuser.me/api/portraits/men/${Math.floor(
  Math.random() * (100 - 0 + 1)
) + 0}.jpg`

export default (id = '1') => ({
  id,
  fullName: faker.name.findName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatarUrl: faker.image.avatar(),
  userName: faker.internet.userName(),
})
