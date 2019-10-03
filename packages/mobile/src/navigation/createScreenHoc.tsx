import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'
import * as actions from './actions'

export default client => Component => {
  function Screen(props) {
    return (
      <ApolloProvider client={client}>
        <ApolloProviderHooks client={client}>
          <NavigationContext.Provider value={actions}>
            <ActionSheetProvider>
              <Component {...props} />
            </ActionSheetProvider>
          </NavigationContext.Provider>
        </ApolloProviderHooks>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
