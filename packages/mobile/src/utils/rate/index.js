import Rate, { AndroidMarket } from 'react-native-rate'
import { track, events } from 'utils/analytics'

const APPLE_APP_ID = '1450213123'
const GOOGLE_PACKAGE_NAME = 'com.wrench'

export const askForRating = ({
  preferInApp = false,
  openAppStoreIfInAppFails = true,
  fallbackPlatformURL = null,
}) => {
  const options = {
    AppleAppID: APPLE_APP_ID,
    GooglePackageName: GOOGLE_PACKAGE_NAME,
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp,
    openAppStoreIfInAppFails,
    fallbackPlatformURL,
  }

  return Rate.rate(options, success => {
    if (success) {
      track(events.RATING_OPEN_INITED)
    } else {
      track(events.RATING_OPEN_FAILED)
    }
  })
}
