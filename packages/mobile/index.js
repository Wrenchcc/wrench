import 'i18n'
import { Navigation } from 'react-native-navigation'
import { links, notifications } from 'react-native-firebase'
import { Bootstrap } from 'navigation'
import { handleDynamicLink, handlePushNotification } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'

Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
    trackScreen(componentName)
  })

  const initialLink = await links().getInitialLink()
  if (initialLink) {
    handleDynamicLink(initialLink)
  }

  links().onLink(handleDynamicLink)

  const notificationOpen = await notifications().getInitialNotification()
  if (notificationOpen && notificationOpen.notification.data) {
    handlePushNotification(notificationOpen.notification.data.path)
  }

  notifications().onNotificationOpened(({ notification }) => {
    if (notification.data) {
      handlePushNotification(notification.data.path)
    }
  })
})
