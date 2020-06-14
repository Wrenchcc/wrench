import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'
import AppVersion from 'utils/appVersion'

export let SentryInstance = Sentry

async function setupSentry() {
  if (!__DEV__) {
    const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

    SentryInstance.init({
      dsn: Config.SENTRY_DSN,
      release: AppVersion,
      environment,
    })
  } else {
    SentryInstance = {
      captureException: (e) => console.log(e),
      setUser: (c) => console.log(c),
      setRelease: (c) => console.log(c),
    }
  }
}

setupSentry()

export const logError = (err) => SentryInstance.captureException(err)
