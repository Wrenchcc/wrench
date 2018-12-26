import { NOTIFICATION_TYPES } from 'api/utils/notificationTypes'

// TODO: Fix dynamicLink and locale
export default function formatNotification(type, data, user) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        body: `${user.fullName} started following your project ${data.title}.`,
        title: 'New follower',
      }
    case NOTIFICATION_TYPES.NEW_COMMENT:
      return {
        body: `${user.fullName} commented "${data.text}".`,
        title: 'New comment',
      }
    case NOTIFICATION_TYPES.NEW_MENTION:
      return {
        body: `${user.fullName} mentioned you in a comment on the project "${data.title}".`,
        title: 'Mention',
      }
    default:
      return null
  }
}
