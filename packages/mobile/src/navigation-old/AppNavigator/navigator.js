import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
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

// NOTE: empty path ('') in root navigators
// https://github.com/react-navigation/react-navigation/issues/1527#issuecomment-439201168
const TabNavigator = createBottomTabNavigator(map(toTabRoute, tabRoutes), {
  tabBarComponent: TabBarComponent,
  useNativeDriver: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: false,
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

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      AppNavigator: {
        screen: TabNavigator,
        path: '',
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
)

const ModalNavigator = createStackNavigator(
  {
    AppNavigator: {
      screen: AppNavigator,
      path: '',
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

const ModalStackNavigator = createStackNavigator(
  {
    AppNavigator: {
      screen: ModalNavigator,
      path: '',
      navigationOptions: {
        header: null,
      },
    },
    ...map(toStackRoute, modalStackRoutes),
  },
  {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

export default createAppContainer(ModalStackNavigator)
