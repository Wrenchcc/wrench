import { TAB } from 'navigation'
import Search from './containers/Search'
import { ROUTE_NAMES } from './constants'

// NOTE: Add search as a hidden tab `tabBarButtonComponent` to have a fast transition
// And also loads the data on init
export default {
  [ROUTE_NAMES.SEARCH]: {
    component: Search,
    mode: TAB,
    navigationOptions: {
      header: null,
      tabBarButtonComponent: () => null,
    },
  },
}
