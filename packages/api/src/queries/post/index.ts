import bookmarks from './bookmarks'
import commentsConnection from './commentsConnection'
import filesConnection from './filesConnection'
import likes from './likes'
import likesConnection from './likesConnection'
import permissions from './permissions'
import post from './post'
import posts from './posts'
import project from './project'
import user from './user'

export default {
  Post: {
    bookmarks,
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
