import { useEffect, useState } from 'react'
import { Appearance, useColorScheme } from 'react-native-appearance'
import { LIGHT_THEME, DARK_THEME } from '@wrench/ui'

export default function useDynamicColor(color) {
  const [colorScheme, setColorScheme] = useState(useColorScheme())

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme)
    })

    return () => subscription.remove()
  }, [])

  return colorScheme === 'dark' ? DARK_THEME[color] : LIGHT_THEME[color]
}
