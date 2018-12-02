import filesConnection from './filesConnection'
import project from './project'
import projects from './projects'
import projectSuggestions from './projectSuggestions'
import followersConnection from './followersConnection'
import projectTypes from './projectTypes'
import projectPermissions from './projectPermissions'
import postsConnection from './postsConnection'

export default {
  Project: {
    filesConnection,
    followersConnection,
    postsConnection,
    projectPermissions,
  },
  Query: {
    project,
    projects,
    projectSuggestions,
    projectTypes,
  },
}
