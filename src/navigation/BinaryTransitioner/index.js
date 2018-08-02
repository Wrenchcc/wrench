import { createNavigator, createNavigationContainer, TabRouter } from 'react-navigation'
import Transitioner from './Transitioner'

export default (routeConfigs, config = {}) => {
  const router = TabRouter(routeConfigs, config)

  const navigator = createNavigator(router, routeConfigs, config)(Transitioner)

  return createNavigationContainer(navigator)
}
