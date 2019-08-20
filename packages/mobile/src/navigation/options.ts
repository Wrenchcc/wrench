import { Navigation } from 'react-native-navigation'
import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export default () => {
  Navigation.setDefaultOptions({
    bottomTab: {
      iconInsets: {
        bottom: hasNotch ? -10 : -5,
        left: 0,
        right: 0,
        top: hasNotch ? 10 : 5,
      },
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
      backgroundColor: 'white',
      style: 'dark',
    },
    topBar: {
      height: 0,
      visible: false,
    },
  })
}
