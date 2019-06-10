import { Navigation } from 'react-native-navigation'
import { links, notifications } from 'react-native-firebase'
import { Bootstrap } from 'navigation'
import { handleDynamicLink, handlePushNotification } from 'utils/dynamicLinks'
import { trackScreen } from 'utils/analytics'

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
