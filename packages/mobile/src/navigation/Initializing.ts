import { useEffect } from 'react'
import { pathOr } from 'ramda'
import SplashScreen from 'react-native-splash-screen'
import { withApollo } from 'react-apollo'
import { getAccessToken } from 'utils/storage/auth'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'

function Initializing({ client }) {
  const loadInitialState = async () => {
    try {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        SplashScreen.hide()
        return AuthNavigation()
      }

      const user = pathOr(null, ['data', 'user'], await client.query({ query: CurrentUserQuery }))

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

export default withApollo(Initializing)
