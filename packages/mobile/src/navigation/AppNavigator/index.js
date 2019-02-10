import React, { PureComponent } from 'react'
import { Linking, Alert } from 'react-native'
import { links, notifications } from 'react-native-firebase'
import { setNavigationRef } from 'navigation/actions'
import { withNamespaces } from 'react-i18next'
import { Gateway, ToastNotification } from 'ui'
import { extractDeepLinkFromDynamicLink } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import Navigator from './navigator'

class AppNavigator extends PureComponent {
  constructor(props) {
    super(props)

    this.createNotificationListeners()
    this.createdynamicLinkListener()
  }

  componentWillUnmount() {
    this.dynamicLinkListener()
    this.notificationListener()
    this.notificationOpenedListener()
  }

  createdynamicLinkListener() {
    this.dynamicLinkListener = links().onLink(url => {
      const path = extractDeepLinkFromDynamicLink(url)
      Linking.canOpenURL(path).then(() => Linking.openURL(path))
    })
  }

  async createNotificationListeners() {
    // Triggered when a particular notification has been received in foreground
    this.notificationListener = notifications().onNotification(notification => {
      // TODO: Show in app banner
      // const { title, body } = notification
      if (notification) {
        Alert.alert('onNotification', JSON.stringify(notification))
      }
    })

    // If your app is in background, you can listen for when a
    // notification is clicked / tapped / opened as follows:
    this.notificationOpenedListener = notifications().onNotificationOpened(notificationOpen => {
      // TODO: Route to view
      // const { title, body } = notificationOpen.notification
      if (notificationOpen) {
        Alert.alert('onNotificationOpened', JSON.stringify(notificationOpen))
      }
    })

    // If your app is closed, you can check if it was opened by a
    // notification being clicked / tapped / opened as follows:
    const { notificationOpen } = await notifications().getInitialNotification()
    if (notificationOpen) {
      // const { title, body } = notificationOpen.notification
      // TODO: Route to view
      if (notificationOpen) {
        Alert.alert('getInitialNotification', JSON.stringify(notificationOpen))
      }
    }
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
