import avatarUrl from './avatarUrl'
import currentUser from './currentUser'
import dynamicLink from './dynamicLink'
import followingProjects from './followingProjects'
import interestedIn from './interestedIn'
import isOnline from './isOnline'
import postsConnection from './postsConnection'
import projectCount from './projectCount'
import projectsConnection from './projectsConnection'
import role from './role'
import settings from './settings'
import user from './user'

export default {
  Query: {
    currentUser,
    user,
  },
  User: {
    avatarUrl,
    dynamicLink,
    followingProjects,
    interestedIn,
    isOnline,
    postsConnection,
    projectCount,
    projectsConnection,
    role,
    settings,
  },
}
