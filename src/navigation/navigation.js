import { createSwitchNavigator } from 'react-navigation'
import { AuthLoadingNavigator, AuthNavigator, AppNavigator } from './navigators'

export const Navigation = createSwitchNavigator({
  AuthLoadingNavigator,
  ...(!__DEV__ ? { AuthNavigator } : {}),
  AppNavigator,
})
