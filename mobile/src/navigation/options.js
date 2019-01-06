import React from 'react'
import { Icon } from 'ui'
import { arrowLeft, closeDark } from 'images'
import createTabBarIcon from './utils/createTabBarIcon'
import styles from './styles'

export const toTabRoute = ({ navigationOptions = {}, component, path }) => ({
  screen: component,
  path,
  navigationOptions: {
    tabBarIcon: createTabBarIcon(navigationOptions.tabBarIconSource, navigationOptions.badge),
    ...navigationOptions,
  },
})

export const toStackRoute = ({ navigationOptions = {}, component, path }) => ({
  screen: component,
  path,
  navigationOptions: {
    headerLeft: props => <Icon {...props} source={arrowLeft} />,
    ...styles,
    ...navigationOptions,
  },
})

export const toModalRoute = ({ navigationOptions = {}, component, path }) => ({
  screen: component,
  path,
  navigationOptions: {
    headerLeft: props => <Icon {...props} source={closeDark} />,
    ...styles,
    ...navigationOptions,
  },
})
