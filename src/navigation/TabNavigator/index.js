import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import { TabBarComponent, SearchBar, Add } from 'ui'
import SettingsButton from 'features/profile/components/SettingsButton'
import { ROUTE_NAMES as PROFILE_ROUTE_NAMES } from 'features/profile/constants'
import { ROUTE_NAMES as SEARCH_ROUTE_NAMES } from 'features/search/constants'
import { toTabRoute } from '../options'
import { TAB_HEIGHT } from '../constants'
import { tabRoutes } from '../routes'
import styles from '../styles'

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

export default TabNavigator
