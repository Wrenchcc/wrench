import currentUser from './currentUser'
import user from './user'
import projectsConnection from './projectsConnection'
import postsConnection from './postsConnection'
import interestedIn from './interestedIn'
import settings from './settings'
import projectCount from './projectCount'
import followingProjects from './followingProjects'
import unreadNotifications from './unreadNotifications'

export default {
  Query: {
    currentUser,
    user,
  },
  User: {
    followingProjects,
    interestedIn,
    postsConnection,
    projectCount,
    projectsConnection,
    settings,
    unreadNotifications,
  },
}
