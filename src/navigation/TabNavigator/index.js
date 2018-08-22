import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import Navigator from './navigator'

export default class TabNavigator extends PureComponent {
  render() {
    return <Navigator ref={ref => setNavigationRef(ref)} />
  }
}
