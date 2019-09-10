import DeviceInfo from 'react-native-device-info'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'
import { AppVersion } from 'utils/appVersion'

export let SentryInstance = Sentry

async function setupSentry() {
  if (!__DEV__) {
    const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

    SentryInstance.config(Config.SENTRY_DSN, {
      deactivateStacktraceMerging: true,
    }).install()

    SentryInstance.setTagsContext({
      appVersion: await AppVersion(),
      environment,
      buildNumber: await DeviceInfo.getBuildNumber(),
      deviceInfo: {
        deviceName: await DeviceInfo.getDeviceName(),
        systemName: await DeviceInfo.getSystemName(),
        systemVersion: await DeviceInfo.getSystemVersion(),
      },
    })
  } else {
    SentryInstance = {
      captureException: e => console.log(e),
      setUserContext: c => console.log(c),
    }
  }
}

setupSentry()

export const logError = (err, extra = null) => SentryInstance.captureException(err, { extra })
