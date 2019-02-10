import { NOTIFICATION_TYPES } from '../../../utils/enums'

export default function formatCustomData(type, data) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        data: {
          path: 'notifications',
        },
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
    case NOTIFICATION_TYPES.NEW_COMMENT:
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        data: {
          path: `comments/${data.postId}`,
        },
      }
    default:
      return null
  }
}
