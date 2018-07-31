import withStatusBar from 'navigation/utils/withStatusBar'
import Onboarding from './containers/Onboarding'
import { ROUTE_NAMES } from './constants'

export default {
  [ROUTE_NAMES.ONBOARDING]: {
    navigationOptions: {
      header: null,
    },
    component: withStatusBar(Onboarding, { barStyle: 'light-content' }),
  },
}
