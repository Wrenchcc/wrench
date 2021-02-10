import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@wrench/ui'

export default function createBannerProvider({ Component }) {
  function Screen(props) {
    const colorScheme = useColorScheme()

    return (
      <ThemeProvider mode={colorScheme}>
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return Screen
}
