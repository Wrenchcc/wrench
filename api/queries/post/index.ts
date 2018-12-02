import post from './post'
import posts from './posts'
import imagesConnection from './imagesConnection'
import commentsConnection from './commentsConnection'

export default {
  Post: {
    commentsConnection,
    imagesConnection,
  },
  Query: {
    post,
    posts,
  },
}
