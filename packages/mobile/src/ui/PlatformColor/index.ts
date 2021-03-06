import { Platform, PlatformColor } from 'react-native'

export default Platform.select({
  ios: {
    default: PlatformColor('defaultColor'),
    neutral: PlatformColor('neutralColor'),
    accent: PlatformColor('accentColor'),
    subtle: PlatformColor('subtleColor'),
    inverse: PlatformColor('inverseColor'),
    error: PlatformColor('errorColor'),
    success: PlatformColor('successColor'),
    warning: PlatformColor('warningColor'),
    white: PlatformColor('whiteColor'),
    black: PlatformColor('blackColor'),
    divider: PlatformColor('dividerColor'),
    placeholder: PlatformColor('placeholderColor'),
  },
  android: {
    default: PlatformColor('@color/default_color'),
    neutral: PlatformColor('@color/neutral_color'),
    accent: PlatformColor('@color/accent_color'),
    subtle: PlatformColor('@color/subtle_color'),
    inverse: PlatformColor('@color/inverse_color'),
    error: PlatformColor('@color/error_color'),
    success: PlatformColor('@color/success_color'),
    warning: PlatformColor('@color/warning_color'),
    white: PlatformColor('@color/white_color'),
    black: PlatformColor('@color/black_color'),
    divider: PlatformColor('@color/divider_color'),
    placeholder: PlatformColor('@color/placeholder_color'),
  },
})
