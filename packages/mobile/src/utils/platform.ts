import { Platform, DeviceInfo, Keyboard } from 'react-native'

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const hasNotch = DeviceInfo.isIPhoneX_deprecated

export let keyboardHeight = 0

Keyboard.addListener('keyboardDidShow', evt => {
  if (isIphone && keyboardHeight === 0) {
    keyboardHeight = evt.endCoordinates.height
  }
})
