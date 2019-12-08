import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'
import { STATUS_BAR } from './constants'

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
    drawBehind: true,
  },
  topBar: {
    height: 0,
    visible: false,
  },
}
