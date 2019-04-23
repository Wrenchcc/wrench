import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const hasNotch = DeviceInfo.hasNotch()
