import React, { PureComponent } from 'react'
import { createAppContainer } from 'react-navigation'
import { setNavigationRef } from 'navigation'
import { withNamespaces } from 'react-i18next'
import { Gateway, Zoomable, ToastNotification } from 'ui'
import { handleDynamicLinks } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import Navigator from './navigator'

const NavigatorContainer = createAppContainer(Navigator)

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
          <NavigatorContainer
            ref={ref => setNavigationRef(ref)}
            screenProps={{ t }}
            onNavigationStateChange={handleStatusBar}
          />
          <ToastNotification />
        </Zoomable.Provider>
      </Gateway.Provider>
    )
  }
}

export default withNamespaces()(TabNavigator)
