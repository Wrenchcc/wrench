import React from 'react'
import { Icon } from 'ui'
import { arrowLeft } from 'images'
import createTabBarIcon from './utils/createTabBarIcon'
import styles from './styles'

export const toTabRoute = ({ navigationOptions = {}, component }) => ({
  screen: component,
  navigationOptions: {
    tabBarIcon: createTabBarIcon(navigationOptions.tabBarIconSource, navigationOptions.badge),
    ...navigationOptions,
  },
})

export const toStackRoute = ({ navigationOptions = {}, component }) => ({
  screen: component,
  navigationOptions: {
    headerLeft: props => <Icon {...props} source={arrowLeft} />,
    ...styles,
    ...navigationOptions,
  },
})

export const toModalRoute = ({ navigationOptions = {}, component }) => ({
  screen: component,
  navigationOptions: {
    header: null,
    ...navigationOptions,
  },
})
