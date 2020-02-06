import { analytics } from 'react-native-firebase'
export { events } from './events'

analytics().setAnalyticsCollectionEnabled(!__DEV__)

export const trackScreen = screenName => {
  analytics().setCurrentScreen(screenName)
}

export const track = (event, params = {}) => {
  if (__DEV__) {
    console.log(event, params)
  } else {
    analytics().logEvent(event, params)
  }
}
