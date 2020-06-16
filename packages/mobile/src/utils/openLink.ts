import { Linking } from 'react-native'
import { logError } from 'utils/sentry'

export default (url: string) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        logError(`Can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
    .catch((err) => logError(err))
}
