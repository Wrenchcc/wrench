import { InteractionManager } from 'react-native'
import { analytics, perf, crashlytics } from 'react-native-firebase'

export { events } from './events'

analytics().setAnalyticsCollectionEnabled(true)

// Disable performance monitoring in dev mode
if (__DEV__) {
  perf().setPerformanceCollectionEnabled(false)
}

export const trackScreen = screenName => {
  InteractionManager.runAfterInteractions(() => {
    analytics().setCurrentScreen(screenName)
  })
}

export const track = (event, params = {}) => {
  InteractionManager.runAfterInteractions(() => {
    analytics().logEvent(event, params)
  })
}

export const logError = message => crashlytics().log(message)
export const recordError = (code, message = null) => crashlytics().recordError(code, message)
