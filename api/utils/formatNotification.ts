import { NOTIFICATION_TYPES } from 'shared/utils/enums'

// TODO: Fix dynamicLink and locale
export default function formatNotification(type, data, user) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        body: `${user.fullName} started following your project: ${data.title}.`,
      }
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return {
        body: `${user.fullName} commented: "${data.text}" on your post ${data.title}.`,
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
      return {
        body: `${user.fullName} mentioned you in a comment: "${data.text}".`,
      }
    case NOTIFICATION_TYPES.NEW_REPLY:
      return {
        body: `${user.fullName} replied to your comment: "${data.text}".`,
      }
    default:
      return null
  }
}
