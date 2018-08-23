import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import Navigator from './navigator'

// TODO: Fix Gateway and Zoomable
export default class AppNavigator extends PureComponent {
  render() {
    return <Navigator ref={ref => setNavigationRef(ref)} />
  }
}
