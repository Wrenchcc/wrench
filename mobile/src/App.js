import React from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import { AuthNavigator, AppNavigator } from 'navigation'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import Onboarding from 'features/signIn/containers/Onboarding'
import { YellowBox } from 'react-native'
import { AppStateProvider, AppStateConsumer } from './AppState'

if (__DEV__) {
  // TODO: Remove
  YellowBox.ignoreWarnings(['Require cycle:'])

  // Setting `global.XMLHttpRequest` will enable showing Network requests in React Native Debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}

const App = () => (
  <AppStateProvider>
    <AppStateConsumer>
      {({ appLoading, loggedIn, client }) => {
        if (appLoading) return null

        return (
          <ApolloProvider client={client}>
            {!loggedIn ? (
              <AuthNavigator />
            ) : (
              <Query query={getCurrentUserQuery} skip={!loggedIn}>
                {({ data: { user }, networkStatus }) => {
                  if (networkStatus === 1 || networkStatus === 2) return null
                  if (!user) return <AuthNavigator />
                  if (!user.interestedIn) return <Onboarding />
                  return <AppNavigator />
                }}
              </Query>
            )}
          </ApolloProvider>
        )
      }}
    </AppStateConsumer>
  </AppStateProvider>
)

export default App
