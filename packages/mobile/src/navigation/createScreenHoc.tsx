import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'
import * as actions from './actions'

export default client => Component => {
  function Screen(props) {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <ApolloProviderHooks client={client}>
            <NavigationContext.Provider value={actions}>
              <ActionSheetProvider>
                <Component {...props} />
              </ActionSheetProvider>
            </NavigationContext.Provider>
          </ApolloProviderHooks>
        </ApolloProvider>
      </SafeAreaProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
