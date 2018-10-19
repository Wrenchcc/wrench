import React from 'react'
import { Provider, Subscribe } from 'unstated'
import { ApolloProvider, Query } from 'react-apollo'
import { path } from 'ramda'
import { AuthNavigator, AppNavigator } from 'navigation'
import { AppContainer } from 'store'
import { getCurrentUserQuery } from 'graphql/queries/user/getCurrentUser'
import Onboarding from 'features/signIn/containers/Onboarding'
import { YellowBox } from 'react-native'

if (__DEV__) {
  // TODO: Remove
  YellowBox.ignoreWarnings(['Require cycle:'])

  // Setting `global.XMLHttpRequest` will enable showing Network requests in React Native Debugger
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest
}

export default function App() {
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
                <Query query={getCurrentUserQuery} skip={!loggedIn}>
                  {({ data, networkStatus }) => {
                    if (networkStatus === 1 || networkStatus === 2) return null
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
