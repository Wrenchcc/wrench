import React from 'react'
import { Provider } from 'unstated'
import { ApolloProvider } from 'react-apollo'
import createClient from 'graphql/createClient'
import { NavigationContext } from './context'

export default function HOC(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <Provider>
        <ApolloProvider client={createClient()}>
          <NavigationContext.Provider value={{ componentId: props.componentId }}>
            <Component {...props} />
          </NavigationContext.Provider>
        </ApolloProvider>
      </Provider>
    )

    return <EnhancedComponent />
  }
}
