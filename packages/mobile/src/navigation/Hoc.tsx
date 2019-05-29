import React from 'react'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import createClient from 'graphql/createClient'
import { NavigationContext } from './context'
import * as actions from './actions'

const client = createClient()

type Props = {
  componentId: string
}

export default Component => {
  function Screen(props): Props {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <NavigationContext.Provider value={actions}>
            <Component {...props} />
          </NavigationContext.Provider>
        </ApolloProvider>
      </Provider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
