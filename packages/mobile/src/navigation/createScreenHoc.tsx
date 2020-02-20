import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { AppearanceProvider } from 'react-native-appearance'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'

export default client => Component => {
  function Screen({ componentId, ...props }) {
    return (
      <ApolloProvider client={client}>
        <AppearanceProvider>
          <NavigationContext.Provider value={componentId}>
            <ActionSheetProvider>
              <Component {...{ componentId, ...props }} />
            </ActionSheetProvider>
          </NavigationContext.Provider>
        </AppearanceProvider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
