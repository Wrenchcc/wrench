import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export default {
  bottomTab: {
    iconInsets: {
      bottom: hasNotch ? -20 : -10,
      left: 0,
      right: 0,
      top: 0,
    },
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    titleDisplayMode: 'alwaysHide',
    backgroundColor: COLORS.DARK,
  },
  layout: {
    backgroundColor: COLORS.WHITE,
  },
  overlay: {
    interceptTouchOutside: false,
  },
  topBar: {
    height: 0,
    visible: false,
  },
}
