import * as SentrySDK from '@sentry/node'

class Sentry {
  constructor() {
    SentrySDK.init({
      dsn: process.env.SENTRY_DSN,
    })
  }

  public captureException = (e: any) => SentrySDK.captureException(e)
}

export default new Sentry()
