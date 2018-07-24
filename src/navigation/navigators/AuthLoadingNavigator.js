import { createStackNavigator } from 'react-navigation'
import { COLORS } from 'ui/constants'
import AuthLoading from 'features/signIn/containers/AuthLoading'
import { NAVIGATORS } from '../constants'

export default createStackNavigator(
  {
    [NAVIGATORS.AUTH_LOADING_NAVIGATOR]: {
      screen: AuthLoading,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)
