import { Linking } from 'react-native'

export default url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log(`Can't handle url: ${url}`) // eslint-disable-line
      } else {
        Linking.openURL(url)
      }
    })
    .catch(err => console.error('An error occurred', err)) // eslint-disable-line
}
