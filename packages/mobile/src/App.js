import React from 'react'
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

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob
  global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader
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
