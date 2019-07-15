import { Navigation } from 'react-native-navigation'
import { links, notifications } from 'react-native-firebase'
import { Bootstrap, registerScreens } from 'navigation'
import { handleDynamicLink, handlePushNotification } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'
import 'i18n'

registerScreens()

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData

  fetch // Ensure to get the lazy property

  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false
  } else {
    /*
     * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
     * If you're using another way you can just use the native Blob and remove the `else` statement
     */
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob
    global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader
  }
}

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
