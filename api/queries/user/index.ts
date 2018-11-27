import currentUser from './currentUser'
import user from './user'
import projectsConnection from './projectsConnection'
import postsConnection from './postsConnection'
import interestedIn from './interestedIn'
import settings from './settings'

export default {
  Query: {
    currentUser,
    user,
  },
  User: {
    interestedIn,
    postsConnection,
    projectsConnection,
    settings,
  },
}
