import comment from './comment'
import commentId from './commentId'
import permissions from './permissions'
import comments from './comments'
import repliesConnection from './repliesConnection'
import user from './user'

export default {
  Comment: {
    commentId,
    permissions,
    repliesConnection,
    user,
  },
  Query: {
    comment,
    comments,
  },
}
