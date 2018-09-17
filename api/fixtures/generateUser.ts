import * as faker from 'faker'

export default (id = '1') => ({
  id,
  fullName: faker.name.findName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  avatarUrl: faker.image.avatar(),
  username: faker.internet.userName(),
  dynamicLink: 'https://wrench.page.link/CNZJ',
  lastSeen: new Date(),
  projectCount: 0,
  isAdmin: false,
  isPro: true,
})
