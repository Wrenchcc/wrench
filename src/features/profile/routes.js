import { TAB } from 'navigation'
import { profile } from 'images'
import User from './containers/User'
import Me from './containers/Me'
import Settings from './containers/Settings'
import { ROUTE_NAMES } from './constants'
import { mapRouteForSection } from './sections'

export default {
  [ROUTE_NAMES.ME]: {
    component: Me,
    mode: TAB,
    navigationOptions: {
      tabBarIconSource: profile,
      tabBarFocusedIconSource: profile,
    },
  },
  [ROUTE_NAMES.USER]: {
    component: User,
  },
  ...mapRouteForSection(Settings),
}
