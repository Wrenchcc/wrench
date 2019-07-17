import post from './post'
import posts from './posts'
import filesConnection from './filesConnection'
import commentsConnection from './commentsConnection'
import permissions from './permissions'
import project from './project'
import user from './user'
import likes from './likes'

export default {
  Post: {
    commentsConnection,
    filesConnection,
    likes,
    permissions,
    postPermissions: permissions, // TODO: Remove
    project,
    user,
  },
  Query: {
    post,
    posts,
  },
}
