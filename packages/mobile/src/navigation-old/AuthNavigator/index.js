import React, { PureComponent } from 'react'
import { createAppContainer } from 'react-navigation'
import { setNavigationRef } from 'navigation-old/actions'
import Navigator from './navigator'

const NavigatorContainer = createAppContainer(Navigator)

export default class AuthNavigator extends PureComponent {
  render() {
    return <NavigatorContainer ref={ref => setNavigationRef(ref)} />
  }
}
