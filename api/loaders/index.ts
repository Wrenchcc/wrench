import { createUserLoader } from './user'
import { createProjectLoader } from './project'
import { createCommentLoader } from './comment'

export default () => ({
  comment: createCommentLoader(),
  project: createProjectLoader(),
  user: createUserLoader(),
})
