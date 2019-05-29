import { COLORS } from 'ui/constants'

export const iconInsets = {
  top: 0,
  left: 0,
  bottom: -20,
  right: 0,
}

export const defaultOptions = {
  bottomTabs: {
    backgroundColor: COLORS.DARK,
  },
  bottomTab: {
    iconColor: 'grey',
    selectedIconColor: COLORS.WHITE,
    textColor: COLORS.WHITE,
    titleDisplayMode: 'alwaysHide',
    iconInsets,
  },
  layout: {
    backgroundColor: COLORS.WHITE,
  },
  topBar: {
    height: 0,
    visible: false,
  },
}
