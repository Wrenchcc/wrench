import { isIphoneX, isIphone } from 'utils/platform'

export const STATUS_BAR_HEIGHT = 10
export const HEADER_HEIGHT = isIphoneX ? 100 : 70
export const TOTAL_HEADER_HEIGHT = isIphone ? HEADER_HEIGHT + STATUS_BAR_HEIGHT : HEADER_HEIGHT

export const IMAGE_PRIORITY = {
  HIGH: 'high',
  LOW: 'low',
  NORMAL: 'normal',
}

export const FONTS = {
  BOLD: isIphone ? 'InterUI-Bold' : 'inter_ui_bold',
  MEDIUM: isIphone ? 'InterUI-Medium' : 'inter_ui_medium',
  REGULAR: isIphone ? 'InterUI-Regular' : 'inter_ui',
}

export const COLORS = {
  DARK_GREY: 'rgb(34,34,34)',
  DARK: 'rgb(000, 000, 000)',
  DIVIDER: 'rgb(237, 237, 239)',
  FACEBOOK: 'rgb(59, 89, 152)',
  GREY: 'rgb(109, 111, 118)',
  LIGHT_GREY: 'rgb(168, 168, 173)',
  ORANGE: 'rgb(246, 138, 86)',
  PRIMARY: 'rgb(42, 119, 90)',
  RED: 'rgb(246, 86, 86)',
  SECONDARY: 'rgb(237, 234, 228)',
  TAB: 'rgb(000, 000, 000)',
  ULTRA_LIGHT_GREY: 'rgb(250, 250, 250)',
  WHITE: 'rgb(255, 255, 255)',
}
