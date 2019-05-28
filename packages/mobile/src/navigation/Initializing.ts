import React, { useEffect } from 'react'
import { pathOr } from 'ramda'
import SplashScreen from 'react-native-splash-screen'
import { withApollo } from 'react-apollo'
import { getTokens } from 'graphql/utils/auth'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'

console.disableYellowBox = true

function Initializing({ client }) {
  const loadInitialState = async () => {
    let showOnboarding = false

    const tokens = await getTokens()
    const user = pathOr(null, ['data', 'user'], await client.query({ query: CurrentUserQuery }))

    if (user) {
      showOnboarding = !user.interestedIn

      SentryInstance.setUserContext({
        username: user.username,
      })
    } else {
      AuthNavigation()
    }

    if (user) {
      AppNavigation(showOnboarding)
    } else {
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
