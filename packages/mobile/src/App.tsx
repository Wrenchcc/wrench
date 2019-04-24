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
import { SentryInstance } from 'utils/sentry'

useScreens()

if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData ? global.originalFormData : global.FormData

  fetch // Ensure to get the lazy property

  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false
  } else {
    /*
     * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
     * If you're using another way you can just use the native Blob and remove the `else` statement
     */
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob
    global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader
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

                    // NOTE: Set user context in Sentry
                    SentryInstance.setUserContext({
                      username: data.user.username,
                    })

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
