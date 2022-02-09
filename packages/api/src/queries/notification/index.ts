import filesConnection from './filesConnection'
import notifications from './notifications'
import unreadNotifications from './unreadNotifications'

export default {
  Notification: {
    filesConnection,
  },
  Query: {
    notifications,
    unreadNotifications,
  },
}
