import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'
import { STATUS_BAR, NAVIGATION_ACTIONS, NAVIGATION_COMPONENTS } from './constants'

export default {
  modalPresentationStyle: 'fullScreen',
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
    backgroundColor: COLORS.DARK,
    titleDisplayMode: 'alwaysHide',
  },
  layout: {
    backgroundColor: COLORS.WHITE,
    orientation: ['portrait'],
  },
  overlay: {
    interceptTouchOutside: false,
  },
  statusBar: {
    backgroundColor: COLORS.WHITE,
    style: STATUS_BAR.DARK,
  },
  topBar: {
    // drawBehind: true,
    elevation: 0,
    noBorder: true,
    leftButtons: [
      {
        id: NAVIGATION_ACTIONS.BACK,
        icon: require('images/arrowLeft.png'),
      },
    ],
  },
  navigationBar: {
    backgroundColor: COLORS.DARK,
  },
}
