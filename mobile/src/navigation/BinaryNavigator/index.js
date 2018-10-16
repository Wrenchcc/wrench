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

// BinaryNavigator({
//   [ROUTE_NAMES.PUBLIC_ONLY]: {
//     screen: AppOnboardingNavigator,
//   },
//   [ROUTE_NAMES.AUTHENTICATED]: {
//     screen: TabNavigator(mapObjIndexed(toTabRoute, tabRoutes), {
//       tabBarComponent: AppTabBarBottom,
//       tabBarPosition: 'bottom',
//       initialRouteName: initialTabName,
//       swipeEnabled: false,
//       animationEnabled: false,
//       tabBarOptions: {
//         inactiveTintColor: Colors.INPUT_TEXT_DARK,
//         style: {
//           backgroundColor: 'white',
//           borderTopWidth: 1,
//           borderTopColor: '#E4E4E5',
//         },
//       },
//     }),
//   },
// })
