import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { Gateway, Zoomable } from 'ui'
import { t } from 'i18n/withLocalization'
import { handleDynamicLinks } from 'utils/dynamicLinks'
import Navigator from './navigator'

export default class TabNavigator extends PureComponent {
  componentDidMount() {
    handleDynamicLinks()
  }

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
