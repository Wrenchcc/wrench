import { Platform, PlatformColor } from 'react-native'

export default Platform.select({
  ios: {
    defaultColor: PlatformColor('defaultColor'),
    neutralColor: PlatformColor('neutralColor'),
    accentColor: PlatformColor('accentColor'),
    subtleColor: PlatformColor('subtleColor'),
    inverseColor: PlatformColor('inverseColor'),
    errorColor: PlatformColor('errorColor'),
    successColor: PlatformColor('successColor'),
    warningColor: PlatformColor('warningColor'),
    whiteColor: PlatformColor('whiteColor'),
    blackColor: PlatformColor('blackColor'),
    dividerColor: PlatformColor('dividerColor'),
    placeholderColor: PlatformColor('placeholderColor'),
  },
  android: {
    defaultColor: PlatformColor('@color/default_color'),
    neutralColor: PlatformColor('@color/neutral_color'),
    accentColor: PlatformColor('@color/accent_color'),
    subtleColor: PlatformColor('@color/subtle_color'),
    inverseColor: PlatformColor('@color/inverse_color'),
    errorColor: PlatformColor('@color/error_color'),
    successColor: PlatformColor('@color/success_color'),
    warningColor: PlatformColor('@color/warning_color'),
    whiteColor: PlatformColor('@color/white_color'),
    blackColor: PlatformColor('@color/black_color'),
    dividerColor: PlatformColor('@color/divider_color'),
    placeholderColor: PlatformColor('@color/placeholder_color'),
  },
})
