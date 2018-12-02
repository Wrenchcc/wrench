import post from './post'
import posts from './posts'
import filesConnection from './filesConnection'
import commentsConnection from './commentsConnection'

export default {
  Post: {
    commentsConnection,
    filesConnection,
  },
  Query: {
    post,
    posts,
  },
}
