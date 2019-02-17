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
    this.notificationListener = notifications().onNotification(({ data }) => {
      if (data.path) {
        const link = formatDeepLink(data.path)
        Linking.canOpenURL(link).then(() => Linking.openURL(link))
      }
    })

    // If your app is in background, you can listen for when a
    // notification is clicked / tapped / opened as follows:
    this.notificationOpenedListener = notifications().onNotificationOpened(({ notification }) => {
      if (notification.data) {
        const link = formatDeepLink(notification.data.path)
        Linking.canOpenURL(link).then(() => Linking.openURL(link))
      }
    })

    // If your app is closed, you can check if it was opened by a
    // notification being clicked / tapped / opened as follows:
    // const { notificationOpen } = await notifications().getInitialNotification()
    // if (notificationOpen) {
    // const { title, body } = notificationOpen.notification
    // TODO: Route to view
    // }
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
