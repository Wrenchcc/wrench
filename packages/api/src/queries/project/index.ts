import dynamicLink from './dynamicLink'
import filesConnection from './filesConnection'
import followersConnection from './followersConnection'
import permissions from './permissions'
import postsConnection from './postsConnection'
import project from './project'
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
    permissions,
    postsConnection,
    projectPermission: permissions, // TODO: Remove
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
