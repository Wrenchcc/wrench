import React from 'react'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo' // TODO: Remove
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import createClient from 'graphql-old/createClient'
import { NavigationContext } from './context'
import { navigate } from './actions'

const client = createClient()

export default Component => {
  function Screen(props) {
    return (
      <Provider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <NavigationContext.Provider value={{ navigate: navigate(props.componentId) }}>
              <Component {...props} />
            </NavigationContext.Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Provider>
    )
  }

  return Screen
}
