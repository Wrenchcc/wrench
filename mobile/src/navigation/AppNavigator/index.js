import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { translate } from 'react-i18next'
import { Gateway, Zoomable } from 'ui'
import { handleDynamicLinks } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
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
          <Navigator
            ref={ref => setNavigationRef(ref)}
            screenProps={{ t }}
            onNavigationStateChange={handleStatusBar}
          />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}

export default translate()(TabNavigator)
