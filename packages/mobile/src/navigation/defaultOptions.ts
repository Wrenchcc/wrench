import { Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { Appearance } from 'react-native'
import { DARK_THEME, LIGHT_THEME } from '@wrench/ui'

const dynamicColor =
  Appearance.getColorScheme() === 'dark' ? DARK_THEME.default : LIGHT_THEME.default

const dynamicStatusbar = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'

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
    style: dynamicStatusbar,
    backgroundColor: dynamicColor,
  },
  layout: {
    backgroundColor: dynamicColor,
    componentBackgroundColor: dynamicColor,
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
