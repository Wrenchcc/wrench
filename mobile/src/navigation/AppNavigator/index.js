import React, { PureComponent } from 'react'
import { Linking } from 'react-native'
import { links } from 'react-native-firebase'
import { setNavigationRef } from 'navigation'
import { withNamespaces } from 'react-i18next'
import { Gateway, ToastNotification } from 'ui'
import { extractDeepLinkFromDynamicLink } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import Navigator from './navigator'

class AppNavigator extends PureComponent {
  constructor(props) {
    super(props)

    this.unsubcribe = links().onLink(url => {
      const path = extractDeepLinkFromDynamicLink(url)
      Linking.canOpenURL(path).then(() => Linking.openURL(path))
    })
  }

  componentWillUnmount() {
    this.unsubcribe()
  }

  render() {
    const { t } = this.props
    return (
      <Gateway.Provider>
        <Navigator
          ref={ref => setNavigationRef(ref)}
          screenProps={{ t }}
          onNavigationStateChange={handleStatusBar}
        />
        <ToastNotification />
      </Gateway.Provider>
    )
  }
}

export default withNamespaces()(AppNavigator)
