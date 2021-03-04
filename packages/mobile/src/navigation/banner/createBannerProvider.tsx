import React, { Suspense } from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@wrench/ui'

export default function createBannerProvider(Component) {
  function Screen({ componentId, ...props }) {
    const colorScheme = useColorScheme()

    return (
      <ThemeProvider mode={colorScheme}>
        <Suspense fallback={null}>
          <Component {...{ componentId, ...props }} />
        </Suspense>
      </ThemeProvider>
    )
  }

  return Screen
}
