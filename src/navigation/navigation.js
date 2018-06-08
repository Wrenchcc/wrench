import { createSwitchNavigator } from 'react-navigation'
import { AuthNavigator, AppNavigator } from './navigators'

export const Navigation = createSwitchNavigator({
  ...(!__DEV__ ? { AuthNavigator } : {}),
  AppNavigator,
})
