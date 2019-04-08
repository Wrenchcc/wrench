import { isIphone } from 'utils/platform'

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
  DIVIDER: 'rgb(230, 231, 233)',
  FACEBOOK: 'rgb(59, 89, 152)',
  GREEN: 'rgb(5, 176, 30)',
  GREY: 'rgb(109, 111, 118)',
  LIGHT_GREY: 'rgb(168, 168, 173)',
  ORANGE: 'rgb(243, 104, 35)',
  PRIMARY: 'rgb(42, 119, 90)',
  RED: 'rgb(246, 86, 86)',
  SECONDARY: 'rgb(237, 234, 228)',
  TAB: 'rgb(000, 000, 000)',
  ULTRA_LIGHT_GREY: 'rgb(237, 237, 239)',
  WHITE: 'rgb(255, 255, 255)',
}
