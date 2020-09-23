import { Options } from 'react-native-navigation'
import { COLORS } from 'ui/constants'

export default {
  modalPresentationStyle: 'fullScreen',
  bottomTab: {
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    backgroundColor: COLORS.DARK,
    titleDisplayMode: 'alwaysHide',
  },
  layout: {
    orientation: ['portrait'],
  },
  overlay: {
    interceptTouchOutside: false,
  },
  topBar: {
    drawBehind: true,
    visible: false,
  },
  navigationBar: {
    backgroundColor: COLORS.DARK,
  },
} as Options
