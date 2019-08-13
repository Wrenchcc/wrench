import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export default {
  bottomTab: {
    iconInsets: {
      bottom: hasNotch ? -10 : -5,
      left: 0,
      right: 0,
      top: hasNotch ? 10 : 5,
    },
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    animate: false,
    backgroundColor: COLORS.DARK,
    drawBehind: false,
    titleDisplayMode: 'alwaysHide',
    visible: true,
  },
  layout: {
    backgroundColor: COLORS.WHITE,
    orientation: ['portrait'],
  },
  overlay: {
    interceptTouchOutside: false,
  },
  statusBar: {
    backgroundColor: 'white',
    style: 'dark',
  },
  topBar: {
    height: 0,
    visible: false,
  },
}
