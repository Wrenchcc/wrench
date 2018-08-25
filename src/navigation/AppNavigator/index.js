import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import { t } from 'i18n/withLocalization'
import Navigator from './navigator'


export default class TabNavigator extends PureComponent {
  render() {
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigator ref={ref => setNavigationRef(ref)} screenProps={{ t }} />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}
