import Config from 'react-native-config'
import codePush from 'react-native-code-push'
import AsyncStorage from '@react-native-community/async-storage'
import { isAndroid } from 'utils/platform'
import { CODEPUSH_DEPLOYMENT_KEY } from 'utils/storage/constants'

export const DEPLOYMENT_KEY_STAGING = isAndroid
  ? Config.CODEPUSH_KEY_ANDROID_STAGING
  : Config.CODEPUSH_KEY_IOS_STAGING

export const DEPLOYMENT_KEY_PRODUCTION = isAndroid
  ? Config.CODEPUSH_KEY_ANDROID_PRODUCTION
  : Config.CODEPUSH_KEY_IOS_PRODUCTION

export const getDeploymentKey = async () => {
  try {
    const deploymentKey = await AsyncStorage.getItem(CODEPUSH_DEPLOYMENT_KEY)

    if (deploymentKey) {
      return deploymentKey
    }

    return DEPLOYMENT_KEY_PRODUCTION
  } catch {}
}

export const setDeploymentKey = async (deploymentKey) => {
  try {
    await AsyncStorage.setItem(CODEPUSH_DEPLOYMENT_KEY, deploymentKey)

    codePush.sync({
      deploymentKey,
      installMode: codePush.InstallMode.IMMEDIATE,
    })

    codePush.restartApp()
  } catch {}
}
