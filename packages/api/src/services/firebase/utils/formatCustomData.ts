import { NOTIFICATION_TYPES } from '../../../utils/enums'
import { getAvatarByFilename, getDefaultAvatar } from '../../../utils/avatar'

export default function formatCustomData(type, data, user) {
  const avatarUrl = user.avatarUrl ? getAvatarByFilename(user.avatarUrl) : getDefaultAvatar()

  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        avatarUrl,
        title: user.fullName,
        path: 'notifications',
      }
    case NOTIFICATION_TYPES.NEW_POST_LIKE:
      return {
        avatarUrl,
        title: user.fullName,
        path: `post/${data.postId}`,
      }
    case NOTIFICATION_TYPES.COMMENT_UPDATES:
    case NOTIFICATION_TYPES.NEW_COMMENT_LIKE:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        avatarUrl,
        title: user.fullName,
        path: `post/${data.postId}/${data.commentId}`,
      }
    default:
      return null
  }
}
