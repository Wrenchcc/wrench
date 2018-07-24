import { Linking } from 'react-native'
import { warn } from 'utils/logger'

export default url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        warn(`Can't handle url: ${url}`)
      } else {
        Linking.openURL(url)
      }
    })
    .catch(err => warn('An error occurred', err))
}
