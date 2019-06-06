import { COLORS } from 'ui/constants'

export default {
  bottomTab: {
    iconInsets: {
      bottom: -20,
      left: 0,
      right: 0,
      top: 0,
    },
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
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
