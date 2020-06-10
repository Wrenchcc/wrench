import { Appearance } from 'react-native'
import { Options } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'
import { STATUS_BAR } from './constants'

const dynamicColor = Appearance.getColorScheme() === 'dark' ? 'black' : 'white'

export default {
  modalPresentationStyle: 'fullScreen',
  bottomTab: {
    iconInsets: {
      bottom: hasNotch ? -10 : -5,
      left: 0,
      right: 0,
      top: hasNotch ? 10 : 5,
    },
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
