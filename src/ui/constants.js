import { isIphoneX, isIphone } from 'utils/platform'

export const STATUS_BAR_HEIGHT = 10
export const HEADER_HEIGHT = isIphoneX ? 100 : 80
export const TOTAL_HEADER_HEIGHT = isIphone ? HEADER_HEIGHT + STATUS_BAR_HEIGHT : HEADER_HEIGHT

export const IMAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
}

export const FONTS = {
  REGULAR: isIphone ? 'InterUI-Regular' : 'inter_ui',
  MEDIUM: isIphone ? 'InterUI-Medium' : 'inter_ui_medium',
  BOLD: isIphone ? 'InterUI-Bold' : 'inter_ui_bold',
}

export const COLORS = {
  WHITE: 'rgb(255, 255, 255)',
  DARK: 'rgb(000, 000, 000)',
  GREY: 'rgb(109, 111, 118)',
  RED: 'rgb(246, 86, 86)',
  ORANGE: 'rgb(246, 138, 86)',
  DIVIDER: 'rgb(230, 231, 233)',
  LIGHT_GREY: 'rgb(168, 168, 173)',
  PRIMARY: 'rgb(42, 119, 90)',
  SECONDARY: 'rgb(237, 234, 228)',
  TAB: 'rgb(000, 000, 000)',
  FACEBOOK: 'rgb(59, 89, 152)',
  BEIGE: 'rgb(237, 234, 228)',
}
