import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@wrench/ui'
import { NavigationContext } from '../context'

export default function createBannerProvider(Component) {
  function Screen({ componentId, ...props }) {
    const colorScheme = useColorScheme()

    return (
      <ThemeProvider mode={colorScheme}>
        <NavigationContext.Provider value={componentId}>
          <Component {...{ componentId, ...props }} />
        </NavigationContext.Provider>
      </ThemeProvider>
    )
  }

  return Screen
}
