import collection from './collection'
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
import translatable from './translatable'

export default {
  Post: {
    collection,
    bookmarks,
    commentsConnection,
    likesConnection,
    filesConnection,
    likes,
    permissions,
    postPermissions: permissions, // TODO: Remove
    project,
    user,
    translatable,
  },
  Query: {
    post,
    posts,
  },
}
