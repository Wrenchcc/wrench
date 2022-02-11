import 'react-native-gesture-handler'
import 'react-native-reanimated'

import 'i18n'

import { Linking, LogBox } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { Navigation } from 'react-native-navigation'
import messaging from '@react-native-firebase/messaging'
import { NavigationBanner, createBannerProvider, createBannerListeners } from 'navigation/banner'
import { store } from 'gql'
import { TOAST_TYPES } from 'utils/enums'
import { Bootstrap, registerScreens, defaultOptions } from 'navigation'
import { createPushNotificationsHandler } from 'utils/pushNotifications'
import { createDeepLinkingHandler } from 'utils/dynamicLinks'
import createClient from 'gql/client'

if (__DEV__) {
  // NOTE: https://github.com/software-mansion/react-native-gesture-handler/issues/1831
  // Because of touchables from RNGH
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ])
}

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions(defaultOptions)

  const client = await createClient()

  registerScreens(client)

  NavigationBanner.register((Component) => createBannerProvider(Component))

  await Bootstrap()

  Linking.addEventListener('url', createDeepLinkingHandler)

  const notificationOpen = await messaging().getInitialNotification()

  if (notificationOpen?.data) {
    createPushNotificationsHandler(notificationOpen.data.path)
  }

  messaging().onNotificationOpenedApp(({ data }) => {
    if (data) {
      createPushNotificationsHandler(data.path)
    }
  })

  createBannerListeners()
})
