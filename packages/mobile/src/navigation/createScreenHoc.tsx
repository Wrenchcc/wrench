import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'

export default client => Component => {
  function Screen({ componentId, ...props }) {
    return (
      <ApolloProvider client={client}>
        <NavigationContext.Provider value={componentId}>
          <ActionSheetProvider>
            <Component {...{ componentId, ...props }} />
          </ActionSheetProvider>
        </NavigationContext.Provider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
