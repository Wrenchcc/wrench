import DeviceInfo from 'react-native-device-info'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'

let SentryInstance = Sentry

if (!__DEV__) {
  const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

  SentryInstance.config(Config.SENTRY_DSN, {
    environment,
    deactivateStacktraceMerging: true,
  }).install()

  SentryInstance.setTagsContext({
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    deviceInfo: {
      systemName: DeviceInfo.getSystemName(),
      systemVersion: DeviceInfo.getSystemVersion(),
      deviceName: DeviceInfo.getDeviceName(),
    },
  })
} else {
  SentryInstance = {
    captureException: e => console.error(e), // eslint-disable-line no-console
  }
}

export const logError = (err, extra = null) => SentryInstance.captureException(err, { extra })
