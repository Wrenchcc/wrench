import { Platform, DeviceInfo } from 'react-native'

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const hasNotch = DeviceInfo.isIPhoneX_deprecated
