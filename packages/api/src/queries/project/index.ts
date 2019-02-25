import dynamicLink from './dynamicLink'
import filesConnection from './filesConnection'
import followersConnection from './followersConnection'
import postsConnection from './postsConnection'
import project from './project'
import projectPermissions from './projectPermissions'
import projects from './projects'
import projectSuggestions from './projectSuggestions'
import projectTypes from './projectTypes'
import type from './type'
import user from './user'

export default {
  Project: {
    dynamicLink,
    filesConnection,
    followersConnection,
    postsConnection,
    projectPermissions,
    type,
    user,
  },
  Query: {
    project,
    projects,
    projectSuggestions,
    projectTypes,
  },
}
