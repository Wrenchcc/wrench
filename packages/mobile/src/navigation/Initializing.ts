import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'
import { getAccessToken } from 'utils/storage/auth'
import { getCurrentUser } from 'gql'
import { SentryInstance } from 'utils/sentry'
import { updateNotificationToken } from 'utils/pushNotifications/register'
import { getDeploymentKey } from 'utils/codepush'
import { AuthNavigation, AppNavigation } from './navigation'

function Initializing() {
  const loadCodepush = async () => {
    const deploymentKey = await getDeploymentKey()

    codePush.sync({
      deploymentKey,
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
    })
  }

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
    loadCodepush()
  }, [])

  return null
}

export default Initializing
