import codePush from 'react-native-code-push'

export const checkFrequency = __DEV__
  ? codePush.CheckFrequency.MANUAL
  : codePush.CheckFrequency.ON_APP_RESUME
