import * as Sentry from '@sentry/react-native'
import codePush from 'react-native-code-push'
import Config from 'react-native-config'
import { readableVersion } from 'utils/appVersion'

export let SentryInstance = Sentry

async function setupSentry() {
  if (!__DEV__) {
    const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

    codePush.getUpdateMetadata().then((update) => {
      if (update) {
        SentryInstance.init({
          dsn: Config.SENTRY_DSN,
          release: `${update.appVersion}+codepush:${update.label}`,
          dist: readableVersion,
          environment,
        })
      }
    })
  } else {
    SentryInstance = {
      ...SentryInstance,
      captureException: (e) => {
        console.log(e)
        return ''
      },
      setUser: (c) => console.log(c),
      setRelease: (c) => console.log(c),
    }
  }
}

setupSentry()

export const logError = (err) => SentryInstance.captureException(err)
