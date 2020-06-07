import { useEffect } from 'react'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import codePush from 'react-native-code-push'
import { getAccessToken } from 'utils/storage/auth'
import { getCurrentUser } from 'gql'
import { SentryInstance } from 'utils/sentry'
import { updateNotificationToken } from 'utils/pushNotifications/register'
import { isAdmin } from 'utils/permissions'
import { isAndroid } from 'utils/platform'
import { AuthNavigation, AppNavigation } from './navigation'

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

        if (isAdmin(data.user)) {
          // For admins
          codePush.sync({
            deploymentKey: isAndroid
              ? Config.CODEPUSH_KEY_ANDROID_STAGING
              : Config.CODEPUSH_KEY_IOS_STAGING,
          })
        }
      } else {
        codePush.sync({
          deploymentKey: isAndroid
            ? Config.CODEPUSH_KEY_ANDROID_PRODUCTION
            : Config.CODEPUSH_KEY_IOS_PRODUCTION,
        })

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

export default Initializing
