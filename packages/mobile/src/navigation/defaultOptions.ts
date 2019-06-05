import { COLORS } from 'ui/constants'

export default {
  bottomTabs: {
    backgroundColor: COLORS.DARK,
  },
  bottomTab: {
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
    iconInsets: {
      top: 0,
      left: 0,
      bottom: -20,
      right: 0,
    },
  },
  layout: {
    backgroundColor: COLORS.WHITE,
  },
  topBar: {
    height: 0,
    visible: false,
  },
  overlay: {
    interceptTouchOutside: false,
  },
}
