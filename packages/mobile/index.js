import 'react-native-gesture-handler'
import 'i18n'

import { Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'
import { updateNotificationToken } from 'utils/pushNotifications/register'

registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  updateNotificationToken()

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
