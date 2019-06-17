import React from 'react'
import { StoreProvider } from 'easy-peasy'
import { ApolloProvider } from 'react-apollo'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import store from 'store-v2'
import createClient from 'graphql/createClient'
import { NavigationContext } from './context'
import * as actions from './actions'

const client = createClient()

export default Component => {
  function Screen(props) {
    return (
      <StoreProvider store={store}>
        <ApolloProvider client={client}>
          <NavigationContext.Provider value={actions}>
            <Component {...props} />
          </NavigationContext.Provider>
        </ApolloProvider>
      </StoreProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
