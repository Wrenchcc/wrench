import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import Navigator from './navigator'

export default class TabNavigator extends PureComponent {
  render() {
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigator ref={ref => setNavigationRef(ref)} />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
