import { Navigation } from 'react-native-navigation'
import { links, notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens, setDefaultOptions } from 'navigation'
import { handleDynamicLink, handlePushNotification } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'
import 'i18n'

registerScreens()

Navigation.events().registerAppLaunchedListener(async () => {
  setDefaultOptions()
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

  links().onLink(handleDynamicLink)

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
