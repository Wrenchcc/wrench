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
    backgroundColor: PlatformColor.blackColor,
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
    backgroundColor: PlatformColor.defaultColor,
    componentBackgroundColor: PlatformColor.defaultColor,
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
    backgroundColor: PlatformColor.blackColor,
  },
} as Options
