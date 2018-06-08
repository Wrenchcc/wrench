import { Dimensions, Platform } from 'react-native'

const { height, width } = Dimensions.get('window')

export default () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height === 812 || width === 812)
