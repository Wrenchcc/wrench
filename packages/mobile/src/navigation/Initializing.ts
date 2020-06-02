import { useEffect } from 'react'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'
import { getAccessToken } from 'utils/storage/auth'
import { getCurrentUser } from 'gql'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'
import { updateNotificationToken } from 'utils/pushNotifications/register'

function Initializing() {
  const loadInitialState = async () => {
    try {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        SplashScreen.hide()
        return AuthNavigation()
      }

      const { data } = await getCurrentUser()

      if (data.user) {
        const showOnboarding = !data.user.interestedIn

        SentryInstance.setUser({
          username: data.user.username,
        })

        updateNotificationToken()

        AppNavigation(showOnboarding)
      } else {
        AuthNavigation()
      }
    } catch {
      AuthNavigation()
    }

    SplashScreen.hide()
  }

  useEffect(() => {
    loadInitialState()
  }, [])

  return null
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  deploymentKey: Config.CODEPUSH_KEY_STAGING,
})(Initializing)
