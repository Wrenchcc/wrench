import { Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'
import 'i18n'

registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
    trackScreen(componentName)
  })

  Linking.addEventListener('url', createDeepLinkingHandler)

  const notificationOpen = await notifications().getInitialNotification()

  if (notificationOpen && notificationOpen.notification.data) {
    setTimeout(() => {
      createPushNotificationsHandler(notificationOpen.notification.data.path)
    }, 500)
  }

  notifications().onNotificationOpened(({ notification }) => {
    if (notification.data) {
      setTimeout(() => {
        createPushNotificationsHandler(notification.data.path)
      }, 500)
    }
  })
})
