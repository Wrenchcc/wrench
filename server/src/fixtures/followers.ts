import generateUser from './generateUser'
import generateId from './generateId'

export default () => [
  {
    ...generateUser(),
    projects: {
      count: 1,
    },
  },
]
