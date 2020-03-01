import Rate, { AndroidMarket } from 'react-native-rate'
import { track, events } from 'utils/analytics'

const APPLE_APP_ID = '1450213123'
const GOOGLE_PACKAGE_NAME = 'com.wrench'

export const askForRating = () => {
  const options = {
    AppleAppID: APPLE_APP_ID,
    GooglePackageName: GOOGLE_PACKAGE_NAME,
    openAppStoreIfInAppFails: true,
    preferInApp: true,
    preferredAndroidMarket: AndroidMarket.Google,
  }

  return Rate.rate(options, success => {
    if (success) {
      track(events.RATING_OPEN_INITED)
    } else {
      track(events.RATING_OPEN_FAILED)
    }
  })
}
