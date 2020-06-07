import React from 'react'
import { useColorScheme } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@wrench/ui'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'

export default (client) => (Component) => {
  function Screen({ componentId, ...props }) {
    const colorScheme = useColorScheme()

    return (
      <ApolloProvider client={client}>
        <ThemeProvider mode={colorScheme}>
          <NavigationContext.Provider value={componentId}>
            <ActionSheetProvider>
              <Component {...{ componentId, ...props }} />
            </ActionSheetProvider>
          </NavigationContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
