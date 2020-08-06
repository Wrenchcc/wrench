import { Appearance } from 'react-native'
import { Options } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { STATUS_BAR } from './constants'

const dynamicColor = Appearance.getColorScheme() === 'dark' ? 'black' : 'white'

export default {
  modalPresentationStyle: 'fullScreen',
  bottomTab: {
    textColor: dynamicColor,
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    backgroundColor: COLORS.DARK,
    titleDisplayMode: 'alwaysHide',
  },
  layout: {
    componentBackgroundColor: dynamicColor,
    orientation: ['portrait'],
  },
  overlay: {
    interceptTouchOutside: false,
  },
  statusBar: {
    backgroundColor: dynamicColor,
    style: Appearance.getColorScheme() === 'dark' ? STATUS_BAR.LIGHT : STATUS_BAR.DARK,
  },
  topBar: {
    drawBehind: true,
    visible: false,
  },
  navigationBar: {
    backgroundColor: COLORS.DARK,
  },
} as Options
