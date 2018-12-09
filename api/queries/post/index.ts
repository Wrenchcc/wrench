import post from './post'
import posts from './posts'
import filesConnection from './filesConnection'
import commentsConnection from './commentsConnection'
import postPermissions from './postPermissions'
import project from './project'
import user from './user'

export default {
  Post: {
    commentsConnection,
    filesConnection,
    postPermissions,
    project,
    user,
  },
  Query: {
    post,
    posts,
  },
}
