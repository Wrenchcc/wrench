import { COLORS } from 'ui/constants'
import { hasNotch, isAndroid } from 'utils/platform'

const customAnimations = isAndroid
  ? {
      animations: {
        pop: {
          content: {
            x: {
              duration: 280,
              from: 0,
              interpolation: 'decelerate',
              to: 500,
            },
          },
        },
        push: {
          content: {
            x: {
              duration: 280,
              from: 500,
              interpolation: 'accelerate',
              to: 0,
            },
          },
        },
      },
    }
  : {}

export default {
  ...customAnimations,
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
  statusBar: {
    backgroundColor: 'white',
    style: 'dark',
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
  topBar: {
    height: 0,
    visible: false,
  },
}
