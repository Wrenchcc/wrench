import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import Navigator from './navigator'

export default class TabNavigator extends PureComponent {
  render() {
    const { changeLoginState } = this.props
    return <Navigator ref={ref => setNavigationRef(ref)} screenProps={{ changeLoginState }} />
  }
}
