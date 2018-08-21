import { PUBLIC } from 'navigation'
import withStatusBar from 'navigation/utils/withStatusBar'
import SignIn from './containers/SignIn'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.SIGN_IN]: {
    scope: PUBLIC,
    navigationOptions: {
      header: null,
    },
    component: withStatusBar(SignIn, { barStyle: 'light-content' }),
  },
}
