import React from 'react'
import styled from 'styled-components'
import {
  Placeholder as RNPlaceholder,
  PlaceholderLine as RNPlaceholderLine,
  PlaceholderMedia as RNPlaceholderMedia,
  Shine,
  ShineOverlay,
} from 'rn-placeholder'
import { useColorScheme } from 'react-native'

export const Placeholder = RNPlaceholder
export const PlaceholderMedia = RNPlaceholderMedia

export const PlaceholderLine = styled(RNPlaceholderLine)`
  background-color: ${(props) => props.theme.colors.placeholder};
`

const AnimationBackground = {
  light: '#DFDFDF',
  dark: '#242424',
}

export const PlaceholderAnimation = (props) => {
  const colorScheme = useColorScheme()
  const backgroundColor = AnimationBackground[colorScheme]

  if (colorScheme === 'dark') {
    return <Shine {...props} style={{ backgroundColor }} />
  }

  return <ShineOverlay {...props} style={{ backgroundColor }} />
}
