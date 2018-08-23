import CodePush from 'react-native-code-push'

export const checkFrequency = {
  checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_START,
}
