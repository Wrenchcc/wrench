import analytics from '@react-native-firebase/analytics'
export { events } from './events'

analytics().setAnalyticsCollectionEnabled(!__DEV__)

export const trackScreen = (screenName) => {
  analytics().logScreenView({
    screen_name: screenName,
  })
}

export const track = (event, params = {}) => {
  if (__DEV__) {
    console.log(event, params)
  } else {
    analytics().logEvent(event, params)
  }
}
