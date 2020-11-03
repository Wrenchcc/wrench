import { Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import { COLORS } from 'ui/constants'

export default {
  modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
  bottomTab: {
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    backgroundColor: COLORS.DARK,
    titleDisplayMode: 'alwaysHide',
  },
  statusBar: {
    drawBehind: true,
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
