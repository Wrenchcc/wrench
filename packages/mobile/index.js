import 'react-native-gesture-handler'
import 'i18n'

import { Linking } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { Navigation } from 'react-native-navigation'
import messaging from '@react-native-firebase/messaging'
import { store } from 'gql'
import { TOAST_TYPES } from 'utils/enums'
import { Bootstrap, registerScreens } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'
import createClient from 'gql/client'

Navigation.events().registerAppLaunchedListener(async () => {
  const client = await createClient()

  registerScreens(client)

  Bootstrap()

  Linking.addEventListener('url', createDeepLinkingHandler)

  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      store.toast.hide()
    } else {
      store.toast.show({ type: TOAST_TYPES.NETWORK })
    }
  })

  const notificationOpen = await messaging().getInitialNotification()

  if (notificationOpen?.data) {
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

  messaging().onMessage((remoteMessage) => {
    store.notification.showNotification(remoteMessage)
  })
})
