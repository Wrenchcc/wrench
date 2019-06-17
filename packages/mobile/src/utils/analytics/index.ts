import { analytics } from 'react-native-firebase'
export { events } from './events'

analytics().setAnalyticsCollectionEnabled(true)

export const trackScreen = screenName => {
  analytics().setCurrentScreen(screenName)
}

export const track = (event, params = {}) => {
  analytics().logEvent(event, params)
}
