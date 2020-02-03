import markAllNotificationsSeen from './markAllNotificationsSeen'
import markNotificationSeen from './markNotificationSeen'
import deleteNotification from './deleteNotification'

export default {
  Mutation: {
    deleteNotification,
    markAllNotificationsSeen,
    markNotificationSeen,
  },
}
