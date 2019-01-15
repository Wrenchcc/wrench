import React, { PureComponent } from 'react'
import { Linking } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { links } from 'react-native-firebase'
import { setNavigationRef } from 'navigation'
import { withNamespaces } from 'react-i18next'
import { Gateway, ToastNotification } from 'ui'
import { extractDeepLinkFromDynamicLink, uriPrefix } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import User from 'features/profile/containers/User'
import Feed from 'features/feed/containers/Feed'
import Navigator from './navigator'

const SimpleApp = createAppContainer(
  createStackNavigator({
    Home: { screen: Feed },
    Profile: {
      screen: User,
      path: 'user/:slug',
    },
  })
)

const NavigatorContainer = createAppContainer(Navigator)

class AppNavigator extends PureComponent {
  constructor(props) {
    super(props)

    this.unsubcribe = links().onLink(url => {
      const path = extractDeepLinkFromDynamicLink(url)
      Linking.canOpenURL(path).then(() => Linking.openURL(path).catch(err => console.log('An error occurred', err)))
    })
  }

  componentWillUnmount() {
    this.unsubcribe()
  }

  render() {
    const { t } = this.props
    return <SimpleApp />
  }
}

export default withNamespaces()(AppNavigator)
