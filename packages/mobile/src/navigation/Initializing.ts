import { useEffect } from 'react'
import { pathOr } from 'ramda'
import SplashScreen from 'react-native-splash-screen'
import { withApollo } from 'react-apollo'
import { getTokens } from 'graphql/utils/auth'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'

function Initializing({ client }) {
  const loadInitialState = async () => {
    try {
      const tokens = await getTokens()
      const user = pathOr(
        null,
        ['data', 'user'],
        await client.query({ query: CurrentUserQuery, skip: !tokens })
      )

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
