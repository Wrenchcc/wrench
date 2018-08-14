import Search from './containers/Search'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.SEARCH]: {
    component: Search,
    navigationOptions: {
      header: null,
    },
  },
}
