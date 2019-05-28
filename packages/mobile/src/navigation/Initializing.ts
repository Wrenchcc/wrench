import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { getTokens } from 'graphql/utils/auth'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import { SentryInstance } from 'utils/sentry'
import { AuthNavigation, AppNavigation } from './navigation'

console.disableYellowBox = true

function Initializing() {
  const loadInitialState = async () => {
    const tokens = await getTokens()
    const user = false // await client.query
    const showOnboarding = user // !user.data.interestedIn

    // SentryInstance.setUserContext({
    //   username: data.user.username,
    // })

    setTimeout(SplashScreen.hide, 500)

    if (user) {
      AppNavigation(showOnboarding)
    } else {
      AuthNavigation()
    }
  }

  useEffect(() => {
    loadInitialState()
  }, [])

  return null
}

export default Initializing
