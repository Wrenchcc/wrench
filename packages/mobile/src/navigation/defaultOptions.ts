import { Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import PlatformColor from 'ui/PlatformColor'
// import { Appearance } from 'react-native'

// const dynamicStatusbar = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'

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
    // style: dynamicStatusbar,
    backgroundColor: PlatformColor.defaultColor,
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
