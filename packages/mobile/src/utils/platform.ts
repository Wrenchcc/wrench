import { Platform, Keyboard } from 'react-native'

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'

export let keyboardHeight = 0

const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', setKeyboardHeight)

function setKeyboardHeight(evt) {
  if (keyboardDidShowListener && isIphone) {
    keyboardHeight = evt.endCoordinates.height
  }
}
