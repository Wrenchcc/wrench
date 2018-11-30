import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { trackScreen } from 'utils/analytics'
import { COLORS } from 'ui/constants'
import { TabBarComponent, SearchBar } from 'ui'
import SettingsButton from 'features/profile/components/SettingsButton'
import { ROUTE_NAMES as PROFILE_ROUTE_NAMES } from 'features/profile/constants'
import { ROUTE_NAMES as SEARCH_ROUTE_NAMES } from 'features/search/constants'
import Add from 'features/project/components/Add'
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

  // Remove header on search and add the search bar in container to get query
  if (focusedRouteName === SEARCH_ROUTE_NAMES.SEARCH) {
    return {
      header: null,
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
    navigationOptions: {
      gesturesEnabled: false, // TODO: See if possible to pass on route
    },
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

// TODO: https://reactnavigation.org/docs/en/stack-navigator.html#gesturesenabled
const transitionConfig = (transitionProps, prevTransitionProps) => prevTransitionProps
  && prevTransitionProps.index === 1
  && StackViewTransitionConfigs.ModalSlideFromBottomIOS

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
