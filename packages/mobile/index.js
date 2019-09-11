import { Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens } from 'navigation'
import handlePushNotification from 'utils/pushNotifications/handle'
import { trackScreen } from 'utils/analytics'
import 'i18n'

registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
    trackScreen(componentName)
  })

  Linking.addEventListener('url', e => console.log(e))

  const notificationOpen = await notifications().getInitialNotification()

  if (notificationOpen && notificationOpen.notification.data) {
    setTimeout(() => {
      handlePushNotification(notificationOpen.notification.data.path)
    }, 500)
  }

  notifications().onNotificationOpened(({ notification }) => {
    if (notification.data) {
      setTimeout(() => {
        handlePushNotification(notification.data.path)
      }, 500)
    }
  })
})
