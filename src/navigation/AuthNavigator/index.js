import { createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import { toStackRoute } from '../options'
import { authRoutes } from '../routes'

const AuthNavigator = createStackNavigator(map(toStackRoute, authRoutes), {
  headerMode: 'screen',
  cardStyle: {
    backgroundColor: COLORS.WHITE,
  },
})

export default AuthNavigator
