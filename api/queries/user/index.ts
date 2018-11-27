import currentUser from './currentUser'
import user from './user'
import projectsConnection from './projectsConnection'

export default {
  Query: {
    user,
    currentUser,
  },
  User: {
    projectsConnection,
  },
}
