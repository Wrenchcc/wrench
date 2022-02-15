import { isIphone } from 'utils/platform'

export const IMAGE_PRIORITY = {
  HIGH: 'high',
  LOW: 'low',
  NORMAL: 'normal',
} as const

export const FONTS = {
  BOLD: isIphone ? 'InterUI-Bold' : 'inter_ui_bold',
  MEDIUM: isIphone ? 'InterUI-Medium' : 'inter_ui_medium',
  REGULAR: isIphone ? 'InterUI-Regular' : 'inter_ui',
}
