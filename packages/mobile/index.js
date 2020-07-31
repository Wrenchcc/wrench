import 'react-native-gesture-handler'
import 'i18n'

import { Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import messaging from '@react-native-firebase/messaging'
import { Bootstrap, registerScreens } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'

registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  Linking.addEventListener('url', createDeepLinkingHandler)

  const notificationOpen = await messaging().getInitialNotification()

  if (notificationOpen && notificationOpen.data) {
    setTimeout(() => {
      createPushNotificationsHandler(notificationOpen.data.path)
    }, 500)
  }

  messaging().onNotificationOpenedApp(({ data }) => {
    if (data) {
      setTimeout(() => {
        createPushNotificationsHandler(data.path)
      }, 500)
    }
  })
})
