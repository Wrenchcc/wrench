import currentUser from './currentUser'
import dynamicLink from './dynamicLink'
import followingProjects from './followingProjects'
import interestedIn from './interestedIn'
import postsConnection from './postsConnection'
import projectCount from './projectCount'
import projectsConnection from './projectsConnection'
import settings from './settings'
import user from './user'

export default {
  Query: {
    currentUser,
    user,
  },
  User: {
    dynamicLink,
    followingProjects,
    interestedIn,
    postsConnection,
    projectCount,
    projectsConnection,
    settings,
  },
}
