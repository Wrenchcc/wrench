import { createUserLoader } from './user'
import { createProjectLoader } from './project'

export default () => ({
  user: createUserLoader(),
  project: createProjectLoader(),
})
