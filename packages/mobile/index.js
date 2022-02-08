import 'react-native-gesture-handler'
import 'react-native-reanimated'

import 'i18n'

import { Linking } from 'react-native'
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
