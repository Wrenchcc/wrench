import React, { PureComponent } from 'react'
import { Linking } from 'react-native'
import { links, notifications } from 'react-native-firebase'
import { setNavigationRef } from 'navigation/actions'
import withTranslation from 'i18n/withTranslation'
import { Gateway, ToastNotification } from 'ui'
import { extractDeepLinkFromDynamicLink, formatDeepLink } from 'utils/dynamicLinks'
import handleStatusBar from 'navigation/handleStatusBar'
import Navigator from './navigator'

class AppNavigator extends PureComponent {
  componentDidMount() {
    this.createNotificationListener()
    this.createInitialNotificationListerer()

    this.createdynamicLinkListener()
    this.getInitialLink()

    // TODO: Show in app notification
    // notifications().onNotification(handleNotification);
  }

  componentWillUnmount() {
    this.dynamicLinkListener()
    this.notificationOpenedListener()
  }

  async getInitialLink() {
    const url = await links().getInitialLink()

    if (url) {
      const path = extractDeepLinkFromDynamicLink(url)
      Linking.canOpenURL(path).then(() => Linking.openURL(path))
    }
  }

  createdynamicLinkListener() {
    this.dynamicLinkListener = links().onLink(url => {
      const path = extractDeepLinkFromDynamicLink(url)
      Linking.canOpenURL(path).then(() => Linking.openURL(path))
    })
  }

  createNotificationListener() {
    // Get the action triggered by the notification being opened
    this.notificationOpenedListener = notifications().onNotificationOpened(({ notification }) => {
      if (notification.data) {
        const link = formatDeepLink(notification.data.path)
        Linking.canOpenURL(link).then(() => Linking.openURL(link))
      }
    })
  }

  async createInitialNotificationListerer() {
    // If your app is closed
    const notificationOpen = await notifications().getInitialNotification()
    if (notificationOpen && notificationOpen.notification.data) {
      const link = formatDeepLink(notificationOpen.notification.data.path)
      Linking.canOpenURL(link).then(() => Linking.openURL(link))
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

export default withTranslation()(AppNavigator)
