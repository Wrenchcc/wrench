import { createNavigator, createNavigationContainer, TabRouter } from 'react-navigation'
import Transitioner from './Transitioner'

export default (routeConfigs, config = {}) => {
  if (Object.keys(routeConfigs).length !== 2) {
    throw new Error('BinaryNavigator must receive exactly two routes')
  }

  const router = TabRouter(routeConfigs, config)

  const navigator = createNavigator(router, routeConfigs, config)(Transitioner)

  return createNavigationContainer(navigator)
}
