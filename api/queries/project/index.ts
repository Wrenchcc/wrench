import imagesConnection from './imagesConnection'
import project from './project'
import projects from './projects'
import projectSuggestions from './projectSuggestions'
import followersConnection from './followersConnection'
import projectTypes from './projectTypes'

export default {
  Project: {
    followersConnection,
    imagesConnection,
  },
  Query: {
    project,
    projects,
    projectSuggestions,
    projectTypes,
  },
}
