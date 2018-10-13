import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { map, pathOr } from 'ramda'
import { trackScreen } from 'utils/analytics'
import { COLORS } from 'ui/constants'
import { TabBarComponent, SearchBar, Add } from 'ui'
import SettingsButton from 'features/profile/components/SettingsButton'
import { ROUTE_NAMES as PROFILE_ROUTE_NAMES } from 'features/profile/constants'
import { ROUTE_NAMES as SEARCH_ROUTE_NAMES } from 'features/search/constants'
import { StackViewTransitionConfigs } from 'react-navigation-stack' // eslint-disable-line
import { toTabRoute, toModalRoute, toStackRoute } from '../options'
import { TAB_HEIGHT } from '../constants'
import { tabRoutes, modalRoutes, modalStackRoutes, stackRoutes } from '../routes'
import styles from '../styles'

const TabNavigator = createBottomTabNavigator(map(toTabRoute, tabRoutes), {
  tabBarComponent: TabBarComponent,
  useNativeDriver: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: COLORS.WHITE,
    showLabel: false,
    showIcon: true,
    style: {
      height: TAB_HEIGHT,
      backgroundColor: COLORS.TAB,
    },
    indicatorStyle: {
      backgroundColor: 'transparent',
    },
  },
})

// Navigation Options on TabNavigator
TabNavigator.navigationOptions = ({ navigation }) => {
  const focusedRouteName = navigation.state.routes[navigation.state.index].routeName
  trackScreen(focusedRouteName)

  if (focusedRouteName === PROFILE_ROUTE_NAMES.ME) {
    return {
      ...styles,
      headerLeft: <SettingsButton />,
      headerRight: <Add />,
      headerTitle: false,
    }
  }

  if (focusedRouteName === SEARCH_ROUTE_NAMES.SEARCH) {
    return {
      ...styles,
      headerTitle: <SearchBar placeholder={false} cancelButton />,
    }
  }

  return {
    ...styles,
    headerTitle: <SearchBar />,
  }
}

const AppNavigator = createStackNavigator(
  {
    AppNavigator: {
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

const ModalNavigator = createStackNavigator(
  {
    AppNavigator: {
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
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

const transitionConfig = (transitionProps, prevTransitionProps) => {
  // IN: add-caption AppNavigator
  // BACK: AppNavigator add-caption
  // CLOSE: AppNavigator add-caption

  // console.log(
  //   transitionProps.navigation.state.routes[transitionProps.navigation.state.index].routeName,
  //   prevTransitionProps
  //     && prevTransitionProps.navigation.state.routes[prevTransitionProps.navigation.state.index]
  //       .routeName
  // )

  console.log(
    transitionProps.navigation.state,
    prevTransitionProps && prevTransitionProps.navigation.state
  )

  // if (
  //   transitionProps.navigation.state.routes[transitionProps.navigation.state.index].routeName
  //     !== 'add-caption'
  //   && prevTransitionProps
  // ) {
  //   return StackViewTransitionConfigs.ModalSlideFromBottomIOS
  // }

  return (
    prevTransitionProps
    && prevTransitionProps.index === 1
    && StackViewTransitionConfigs.ModalSlideFromBottomIOS
  )
}
const ModalStackNavigator = createStackNavigator(
  {
    AppNavigator: {
      screen: ModalNavigator,
      navigationOptions: {
        header: null,
      },
    },
    ...map(toStackRoute, modalStackRoutes),
  },
  {
    headerMode: 'screen',
    transitionConfig,
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

export default ModalStackNavigator
