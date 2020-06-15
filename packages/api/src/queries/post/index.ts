import post from './post'
import posts from './posts'
import filesConnection from './filesConnection'
import commentsConnection from './commentsConnection'
import likesConnection from './likesConnection'
import permissions from './permissions'
import project from './project'
import user from './user'
import likes from './likes'

export default {
  Post: {
    commentsConnection,
    likesConnection,
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
