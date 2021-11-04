import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { getAccessToken } from 'utils/storage/auth'
import { getCurrentUser } from 'gql'
import { SentryInstance } from 'utils/sentry'
import { updateNotificationToken } from 'utils/pushNotifications/register'
import { AuthNavigation, AppNavigation } from './navigation'
import { registerUserLocale } from 'i18n'

function Initializing() {
  const loadInitialState = async () => {
    try {
      const accessToken = getAccessToken()

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
        registerUserLocale(data.user)

        await AppNavigation(showOnboarding)
      } else {
        await AuthNavigation()
      }
    } catch {
      await AuthNavigation()
    }

    SplashScreen.hide()
  }

  useEffect(() => {
    loadInitialState()
  }, [])

  return null
}

export default Initializing
