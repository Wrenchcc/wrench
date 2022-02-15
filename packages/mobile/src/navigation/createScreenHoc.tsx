import React, { Suspense } from 'react'
import { ApolloProvider } from '@apollo/client'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'

export const createScreenHoc = (client) => (Component) => {
  function Screen({ componentId, ...props }) {
    return (
      <ApolloProvider client={client}>
        <NavigationContext.Provider value={componentId}>
          <ActionSheetProvider>
            <Suspense fallback={null}>
              <Component {...{ componentId, ...props }} />
            </Suspense>
          </ActionSheetProvider>
        </NavigationContext.Provider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}

// NOTE: Removing gestureHandlerRootHOC and ActionSheetProvider makes underlaying view to react to touches
export const createOverlayHoC = (client) => (Component) => {
  function Screen({ componentId, ...props }) {
    return (
      <ApolloProvider client={client}>
        <NavigationContext.Provider value={componentId}>
          <Suspense fallback={null}>
            <Component {...{ componentId, ...props }} />
          </Suspense>
        </NavigationContext.Provider>
      </ApolloProvider>
    )
  }

  return Screen
}
