import 'react-native-gesture-handler'
import 'i18n'

import { Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'
import createClient from 'services/gql/client'

Navigation.events().registerAppLaunchedListener(async () => {
  const client = await createClient()
  registerScreens(client)

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
