import { COLORS } from 'ui/constants'
import { arrowLeft } from 'images'

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
    noBorder: true,
    borderHeight: 0,
    backButton: {
      icon: arrowLeft,
      color: COLORS.DARK,
    },
  },
}
