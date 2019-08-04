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
  layout: {
    backgroundColor: COLORS.WHITE,
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
