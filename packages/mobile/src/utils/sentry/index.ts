import * as Sentry from '@sentry/react-native'
import Config from 'react-native-config'
import { readableVersion } from 'utils/appVersion'

export let SentryInstance = Sentry

async function setupSentry() {
  if (!__DEV__) {
    const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

    SentryInstance.init({
      dsn: Config.SENTRY_DSN,
      release: readableVersion,
      environment,
    })
  } else {
    SentryInstance = {
      ...SentryInstance,
      captureException: e => {
        console.log(e)
        return ''
      },
      setUser: c => console.log(c),
      setRelease: c => console.log(c),
    }
  }
}

setupSentry()

export const logError = err => SentryInstance.captureException(err)
