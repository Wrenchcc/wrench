import comments from './comments'
import repliesConnection from './repliesConnection'
import user from './user'

export default {
  Comment: {
    repliesConnection,
    user,
  },
  Query: {
    comments,
  },
}
