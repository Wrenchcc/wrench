import { createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { toStackRoute, toModalRoute } from './options'
import { NAVIGATORS } from './constants'
import { stackRoutes, modalRoutes } from './routes'

const AppNavigator = createStackNavigator(
  {
    [NAVIGATORS.TAB_NAVIGATOR]: {
      screen: TabNavigator,
    },
    ...map(toStackRoute, stackRoutes),
  },
  {
    headerLayoutPreset: 'center',
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

export default function createAppNavigator(authenticated = false) {
  return createStackNavigator(
    {
      [NAVIGATORS.AUTH_NAVIGATOR]: {
        screen: AuthNavigator,
        navigationOptions: {
          header: null,
        },
      },
      [NAVIGATORS.APP_NAVIGATOR]: {
        screen: AppNavigator,
        navigationOptions: {
          header: null,
        },
      },
      ...map(toModalRoute, modalRoutes),
    },
    {
      mode: 'modal',
      headerMode: 'screen',
      initialRouteName: authenticated ? NAVIGATORS.APP_NAVIGATOR : NAVIGATORS.AUTH_NAVIGATOR,
      cardStyle: {
        backgroundColor: COLORS.WHITE,
      },
    }
  )
}
