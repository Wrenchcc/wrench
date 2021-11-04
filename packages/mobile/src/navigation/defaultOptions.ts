import { Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import { Appearance } from 'react-native'
import PlatformColor from 'ui/PlatformColor'
import { isAndroid } from 'utils/platform'

export default {
  modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
  bottomTab: {
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    backgroundColor: PlatformColor.black,
    titleDisplayMode: 'alwaysHide',
    tabsAttachMode: 'afterInitialTab',
  },
  statusBar: {
    drawBehind: true,
    backgroundColor: 'transparent',
    translucent: false,
    // NOTE: Android does not resolve correct style automaticlly like iOS
    ...(isAndroid && { style: Appearance.getColorScheme() === 'dark' ? 'light' : 'dark' }),
  },
  layout: {
    backgroundColor: PlatformColor.default,
    componentBackgroundColor: PlatformColor.default,
    orientation: ['portrait'],
  },
  overlay: {
    interceptTouchOutside: false,
  },
  topBar: {
    drawBehind: true,
    visible: false,
  },
  navigationBar: {
    backgroundColor: PlatformColor.black,
  },
} as Options
