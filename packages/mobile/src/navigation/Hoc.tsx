import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import createClient from 'gql/client'
import { NavigationContext } from './context'
import * as actions from './actions'

const client = createClient()

export default Component => {
  function Screen(props) {
    return (
      <ApolloProvider client={client}>
        <NavigationContext.Provider value={actions}>
          <Component {...props} />
        </NavigationContext.Provider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
