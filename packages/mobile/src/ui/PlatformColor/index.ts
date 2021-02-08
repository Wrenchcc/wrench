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
})
