import { useEffect } from 'react'
import { pathOr } from 'ramda'
import SplashScreen from 'react-native-splash-screen'
import { getAccessToken } from 'utils/storage/auth'
import { client, CURRENT_USER_QUERY } from 'gql'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'

function Initializing() {
  const loadInitialState = async () => {
    try {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        SplashScreen.hide()
        return AuthNavigation()
      }

      const user = pathOr(null, ['data', 'user'], await client.query({ query: CURRENT_USER_QUERY }))

      if (user) {
        const showOnboarding = !user.interestedIn

        SentryInstance.setUserContext({
          username: user.username,
        })

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

export default Initializing
