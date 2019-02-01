import commentId from './commentId'
import comments from './comments'
import repliesConnection from './repliesConnection'
import user from './user'

export default {
  Comment: {
    commentId,
    repliesConnection,
    user,
  },
  Query: {
    comments,
  },
}
