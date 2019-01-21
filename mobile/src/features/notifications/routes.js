import { TAB } from 'navigation/constants'
import { notifications } from 'images'
import { ROUTE_NAMES } from './constants'
import Notifications from './containers/Notifications'

export default {
  [ROUTE_NAMES.NOTIFICATIONS]: {
    component: Notifications,
    mode: TAB,
    navigationOptions: {
      tabBarIconSource: notifications,
      tabBarFocusedIconSource: notifications,
      badge: true,
    },
  },
}
