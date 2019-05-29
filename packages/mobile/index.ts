import { Navigation } from 'react-native-navigation'
import { links, notifications } from 'react-native-firebase'
import { Bootstrap } from 'navigation'
import { handleDynamicLink, handlePushNotification } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'

// TODO: Fix setTimeout
Navigation.events().registerAppLaunchedListener(async () => {
  Bootstrap()

  Navigation.events().registerComponentDidAppearListener(({ componentName }) => {
    trackScreen(componentName)
  })

  const initialLink = await links().getInitialLink()
  if (initialLink) {
    setTimeout(() => {
      handleDynamicLink(initialLink)
    }, 500)
  }

  setTimeout(() => {
    links().onLink(link => handleDynamicLink(link))
  }, 500)

  // If your app is closed
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
