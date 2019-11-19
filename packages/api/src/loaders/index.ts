import { createUserLoader } from './user'
import { createProjectLoader } from './project'
import { createCommentLoader } from './comment'

export default () => ({
  user: createUserLoader(),
  project: createProjectLoader(),
  comment: createCommentLoader(),
})
