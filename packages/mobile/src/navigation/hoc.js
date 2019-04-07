import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo' // TODO: Remove
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import createClient from 'graphql-old/createClient'
import { NavigationContext } from './context'

function handleNavigate(componentId) {
  return (screen, { options, ...params }) => Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: params,
      options,
    },
  })
}

export default Component => {
  function Screen(props) {
    const client = createClient()

    return (
      <Provider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <NavigationContext.Provider value={{ navigate: handleNavigate(props.componentId) }}>
              <Component {...props} />
            </NavigationContext.Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Provider>
    )
  }

  return Screen
}
