import React, { PureComponent } from 'react'
import { setNavigationRef } from 'navigation'
import { withNamespaces } from 'react-i18next'
import { Gateway, Zoomable } from 'ui'
import { handleDynamicLinks } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import Navigator from './navigator'

class TabNavigator extends PureComponent {
  componentDidMount() {
    // TODO: Implement directly in Navigation
    // https://github.com/react-navigation/react-navigation/issues/4887
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

export default withNamespaces()(TabNavigator)
