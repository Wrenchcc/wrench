import { TAB } from 'navigation/constants'
import { notifications } from 'images'
import { ROUTE_NAMES } from './constants'
import Notifications from './containers/Notifications'

export default {
  [ROUTE_NAMES.NOTIFICATIONS]: {
    component: Notifications,
    path: 'notifications',
    mode: TAB,
    navigationOptions: {
      tabBarIconSource: notifications,
      tabBarFocusedIconSource: notifications,
      badge: true,
    },
  },
}
