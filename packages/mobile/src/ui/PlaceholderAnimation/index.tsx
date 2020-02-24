import React from 'react'
import { ShineOverlay, Shine } from 'rn-placeholder'
import { useColorScheme } from 'react-native-appearance'

const AnimationBackground = {
  light: '#DFDFDF',
  dark: '#242424',
}

const PlaceholderAnimation = props => {
  const colorScheme = useColorScheme()
  const backgroundColor = AnimationBackground[colorScheme]

  if (colorScheme === 'dark') {
    return <Shine {...props} style={{ backgroundColor }} />
  }

  return <ShineOverlay {...props} style={{ backgroundColor }} />
}

export default PlaceholderAnimation
