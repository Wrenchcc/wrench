import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import Navigator from './navigator'

// TODO: Fix Gateway and Zoomable
export default class AppNavigator extends PureComponent {
  render() {
    const { changeLoginState } = this.props
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigator ref={ref => setNavigationRef(ref)} screenProps={{ changeLoginState }} />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
