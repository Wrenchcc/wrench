import collectionsConnection from './collectionsConnection'
import cover from './cover'
import dynamicLink from './dynamicLink'
import filesConnection from './filesConnection'
import followersConnection from './followersConnection'
import model from './model'
import permissions from './permissions'
import postsConnection from './postsConnection'
import project from './project'
import projects from './projects'
import projectCollections from './projectCollections'
import projectSuggestions from './projectSuggestions'
import projectTypes from './projectTypes'
import similarProjects from './similarProjects'
import type from './type'
import user from './user'

export default {
  Project: {
    collectionsConnection,
    cover,
    dynamicLink,
    filesConnection,
    followersConnection,
    model,
    permissions,
    postsConnection,
    projectPermissions: permissions, // TODO: Remove
    type,
    user,
  },
  Query: {
    projectCollections,
    project,
    projects,
    projectSuggestions,
    projectTypes,
    similarProjects,
  },
}
