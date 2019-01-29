import { createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import { toStackRoute, toModalRoute } from '../options'
import { authRoutes, modalRoutes } from '../routes'

const AuthNavigator = createStackNavigator(map(toStackRoute, authRoutes), {
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: COLORS.WHITE,
  },
})

export default createStackNavigator(
  {
    AuthNavigator: {
      screen: AuthNavigator,
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
