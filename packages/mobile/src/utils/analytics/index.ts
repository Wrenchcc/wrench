import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency'
import analytics from '@react-native-firebase/analytics'
export { events } from './events'

export const getTrackingConsent = async () => {
  const status = await getTrackingStatus()

  if (status === 'not-determined') {
    const trackingStatus = await requestTrackingPermission()
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      analytics().setAnalyticsCollectionEnabled(!__DEV__)
    }
  }
}

export const trackScreen = (screenName) => {
  analytics().logScreenView({
    screen_name: screenName,
  })
}

export const track = (event, params = {}) => {
  if (__DEV__) {
    if (!!params) {
      console.log(event)
    } else {
      console.log(event, params)
    }
  } else {
    if (!!params) {
      analytics().logEvent(event)
    } else {
      analytics().logEvent(event, params)
    }
  }
}
