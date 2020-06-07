import { useColorScheme } from 'react-native'
import { LIGHT_THEME, DARK_THEME } from '@wrench/ui'

export default function useDynamicColor(color) {
  const colorScheme = useColorScheme()

  return colorScheme === 'dark' ? DARK_THEME[color] : LIGHT_THEME[color]
}
