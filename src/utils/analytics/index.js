import { analytics } from 'react-native-firebase'

analytics.setAnalyticsCollectionEnabled(true)

export const track = (event, params) => analytics.logEvent(event, params)
export const setUserId = id => analytics.setUserId(id)
