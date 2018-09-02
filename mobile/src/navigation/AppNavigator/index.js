import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { translate } from 'react-i18next'
import { Gateway, Zoomable } from 'ui'
import { handleDynamicLinks } from 'utils/dynamicLinks'
import Navigator from './navigator'

class TabNavigator extends PureComponent {
  componentDidMount() {
    handleDynamicLinks()
  }

  render() {
    const { t } = this.props
    return (
      <Gateway.Provider>
        <Zoomable.Provider>
          <Navigator ref={ref => setNavigationRef(ref)} screenProps={{ t }} />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}

export default translate()(TabNavigator)
