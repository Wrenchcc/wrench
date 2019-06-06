import DeviceInfo from 'react-native-device-info'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'
import { appVersion } from 'utils/constants'

export let SentryInstance = Sentry

if (!__DEV__) {
  const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

  SentryInstance.config(Config.SENTRY_DSN, {
    deactivateStacktraceMerging: true,
    environment,
  }).install()

  SentryInstance.setTagsContext({
    appVersion,
    buildNumber: DeviceInfo.getBuildNumber(),
    deviceInfo: {
      deviceName: DeviceInfo.getDeviceName(),
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
    },
  })
} else {
  SentryInstance = {
    captureException: e => console.log(e),
    setUserContext: c => console.log(c),
  }
}

export const logError = (err, extra = null) => SentryInstance.captureException(err, { extra })
