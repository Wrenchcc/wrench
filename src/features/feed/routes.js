import { TAB } from 'navigation'
import { feed } from 'images'
import Feed from './containers/Feed'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.FEED]: {
    component: Feed,
    mode: TAB,
    navigationOptions: {
      tabBarIconSource: feed,
      tabBarFocusedIconSource: feed,
    },
  },
}
