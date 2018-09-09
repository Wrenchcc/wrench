import { analytics, perf } from 'react-native-firebase'

export { events } from './events'

analytics().setAnalyticsCollectionEnabled(true)

// Disable performance monitoring in dev mode
if (__DEV__) {
  perf().setPerformanceCollectionEnabled(false)
}

export const trackScreen = screenName => analytics().setCurrentScreen(screenName)
export const track = (event, params = {}) => analytics().logEvent(event, params)

export const logError = message => console.log(message) // crashlytics().log(message)
export const recordError = (code, message = null) => console.log(code, message) // crashlytics().recordError(code, message)
