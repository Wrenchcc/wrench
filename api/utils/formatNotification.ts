import { NOTIFICATION_TYPES } from 'api/utils/notificationTypes'

// TODO: Fix dynamicLink and locale
export default function formatNotification(type, data, user) {
  switch (type) {
    case NOTIFICATION_TYPES.NEW_FOLLOWER:
      return {
        body: `${user.fullName} started following your project ${data.title}.`,
        title: 'New follower',
      }
    default:
      return null
  }
}
