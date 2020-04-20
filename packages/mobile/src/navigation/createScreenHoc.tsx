import React, { useEffect, useState } from 'react'
import { Appearance, useColorScheme } from 'react-native-appearance'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@wrench/ui'
import { AppearanceProvider } from 'react-native-appearance'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { NavigationContext } from './context'

export default (client) => (Component) => {
  function Screen({ componentId, ...props }) {
    const [colorScheme, setColorScheme] = useState(useColorScheme())

    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme)
      })

      return () => subscription.remove()
    }, [])

    return (
      <ApolloProvider client={client}>
        <AppearanceProvider>
          <ThemeProvider mode={colorScheme}>
            <NavigationContext.Provider value={componentId}>
              <ActionSheetProvider>
                <Component {...{ componentId, ...props }} />
              </ActionSheetProvider>
            </NavigationContext.Provider>
          </ThemeProvider>
        </AppearanceProvider>
      </ApolloProvider>
    )
  }

  return gestureHandlerRootHOC(Screen)
}
