import post from './post'
import posts from './posts'
import filesConnection from './filesConnection'
import commentsConnection from './commentsConnection'
import postPermissions from './postPermissions'

export default {
  Post: {
    commentsConnection,
    filesConnection,
    postPermissions,
  },
  Query: {
    post,
    posts,
  },
}
