import { Options, OptionsModalPresentationStyle } from 'react-native-navigation'
import { Appearance } from 'react-native'
import { isAndroid } from 'utils/platform'

export default {
  modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
  bottomTab: {
    titleDisplayMode: 'alwaysHide',
  },
  bottomTabs: {
    drawBehind: false,
    backgroundColor: '#000',
    titleDisplayMode: 'alwaysHide',
    tabsAttachMode: 'onSwitchToTab',
    hideShadow: true,
    elevation: 0,
  },
  statusBar: {
    drawBehind: true,
    backgroundColor: 'transparent',
    translucent: false,
    // NOTE: Android does not resolve correct style automaticlly like iOS
    ...(isAndroid && { style: Appearance.getColorScheme() === 'dark' ? 'light' : 'dark' }),
  },
  layout: {
    // https://github.com/wix/react-native-navigation/issues/7455
    // backgroundColor: {
    //   light: '#fff',
    //   dark: '#000',
    // },
    componentBackgroundColor: {
      light: '#fff',
      dark: '#000',
    },
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
    backgroundColor: '#000',
  },
} as Options
