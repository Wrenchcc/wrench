import { Platform, Keyboard } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const hasNotch = DeviceInfo.hasNotch()

export let keyboardHeight = 0

const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', setKeyboardHeight)

function setKeyboardHeight(evt) {
  if (keyboardDidShowListener && isIphone) {
    keyboardHeight = evt.endCoordinates.height
  }
}
