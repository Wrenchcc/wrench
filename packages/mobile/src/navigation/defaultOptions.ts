import { Dimensions } from 'react-native'
import { COLORS } from 'ui/constants'
import { hasNotch, isAndroid } from 'utils/platform'

const { width } = Dimensions.get('window')

const customAnimations = isAndroid
  ? {
      animations: {
        push: {
          content: {
            x: {
              from: 2000,
              to: 0,
              duration: 280,
              interpolation: 'accelerate',
            },
          },
        },
        pop: {
          content: {
            x: {
              from: 0,
              to: 2000,
              duration: 280,
              interpolation: 'decelerate',
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
