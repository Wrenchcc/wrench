import comment from './comment'
import commentId from './commentId'
import comments from './comments'
import likes from './likes'
import permissions from './permissions'
import repliesConnection from './repliesConnection'
import recentComments from './recentComments'
import user from './user'
import translatable from './translatable'

export default {
  Comment: {
    commentId,
    likes,
    permissions,
    repliesConnection,
    user,
    translatable,
  },
  Query: {
    comment,
    comments,
    recentComments,
  },
}
