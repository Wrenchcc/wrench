import { createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import { toStackRoute, toModalRoute } from './options'
import { NAVIGATORS } from '../constants'
import { modalRoutes, authRoutes } from '../routes'

const AuthStackNavigator = createStackNavigator(map(toStackRoute, authRoutes), {
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: COLORS.WHITE,
  },
})

export default createStackNavigator(
  {
    [NAVIGATORS.APP_NAVIGATOR]: {
      screen: AuthStackNavigator,
      navigationOptions: {
        header: null,
      },
    },
    ...map(toModalRoute, modalRoutes),
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)
