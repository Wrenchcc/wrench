import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { map } from 'ramda'
import { COLORS } from 'ui/constants'
import { SearchBar, Add } from 'ui'
import SettingsButton from 'features/profile/components/SettingsButton'
import { ROUTE_NAMES } from 'features/profile/constants'
import { toTabRoute, toStackRoute, toModalRoute } from './options'
import { TAB_HEIGHT } from '../constants'
import { tabRoutes, stackRoutes, modalRoutes } from '../routes'
import styles from './styles'

const TabNavigator = createBottomTabNavigator(map(toTabRoute, tabRoutes), {
  useNativeDriver: true,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
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

  if (focusedRouteName === ROUTE_NAMES.ME) {
    return {
      ...styles,
      headerLeft: <SettingsButton />,
      headerRight: <Add />,
      headerTitle: false,
    }
  }

  return {
    ...styles,
    headerTitle: <SearchBar />,
  }
}

const AppStackNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
    },
    ...map(toStackRoute, stackRoutes),
  },
  {
    cardStyle: {
      backgroundColor: COLORS.WHITE,
    },
  }
)

export default createStackNavigator(
  {
    AppStackNavigator: {
      screen: AppStackNavigator,
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
