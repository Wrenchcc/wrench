import React from 'react'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'
import { Provider, Subscribe } from 'unstated'
import { ApolloProvider, Query } from 'react-apollo'
import { useScreens } from 'react-native-screens'
import { path } from 'ramda'
import { AuthNavigator, AppNavigator } from 'navigation'
import { AppContainer } from 'store'
import { Loader } from 'ui'
import { CurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import Onboarding from 'features/signIn/containers/Onboarding'

useScreens()

let SentryInstance = Sentry

if (!__DEV__) {
  const environment = Config.ENVIRONMENT === 'production' ? 'production' : 'test'

  SentryInstance.config(Config.SENTRY_DSN, {
    environment,
    deactivateStacktraceMerging: false,
  }).install()
} else {
  SentryInstance = {
    captureException: e => console.error(e), // eslint-disable-line no-console
  }
}

function App() {
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {({ state: { appLoading, loggedIn, client } }) => {
          if (appLoading) return null

          return (
            <ApolloProvider client={client}>
              {!loggedIn ? (
                <AuthNavigator />
              ) : (
                <Query query={CurrentUserQuery} skip={!loggedIn}>
                  {({ data, networkStatus }) => {
                    if (networkStatus === 1 || networkStatus === 2) return <Loader />
                    if (!path(['user'], data)) return <AuthNavigator />
                    if (!path(['user', 'interestedIn'], data)) return <Onboarding />

                    return <AppNavigator />
                  }}
                </Query>
              )}
            </ApolloProvider>
          )
        }}
      </Subscribe>
    </Provider>
  )
}

export default App
