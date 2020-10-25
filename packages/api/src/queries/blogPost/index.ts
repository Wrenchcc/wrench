import blogPosts from './blogPosts'
import blogPost from './blogPost'
import user from './user'
import content from './content'

export default {
  BlogPost: {
    user,
    content,
  },
  Query: {
    blogPosts,
    blogPost,
  },
}
