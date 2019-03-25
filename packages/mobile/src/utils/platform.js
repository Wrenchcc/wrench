import { Platform, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export const isAndroid = Platform.OS === 'android'
export const isIphone = Platform.OS === 'ios'
export const isNotchIPhone = isIphone && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)
