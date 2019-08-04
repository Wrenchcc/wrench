import { COLORS } from 'ui/constants'

export default {
  bottomTab: {
    iconInsets: {
      bottom: -10,
      left: 0,
      right: 0,
      top: 10,
    },
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    backgroundColor: COLORS.DARK,
    titleDisplayMode: 'alwaysHide',
  },
  statusBar: {
    backgroundColor: 'white',
    style: 'dark',
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
