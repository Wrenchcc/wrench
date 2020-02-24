import React from 'react'
import { View } from 'react-native'
import { useColorScheme } from 'react-native-appearance'

const getSize = size => ({
  background: {
    borderRadius: size === 'medium' ? 12 : 10,
    height: size === 'medium' ? 12 : 10,
    right: -2,
    top: -2,
    width: size === 'medium' ? 12 : 10,
  },
  badge: {
    borderRadius: size === 'medium' ? 8 : 6,
    height: size === 'medium' ? 8 : 6,
    right: 0,
    top: 0,
    width: size === 'medium' ? 8 : 6,
  },
})

function IsOnline({ badgeSize = 'medium' }) {
  const colorScheme = useColorScheme()

  return (
    <View style={{ zIndex: 1000 }}>
      <View
        pointerEvents="none"
        style={{
          ...getSize(badgeSize).badge,
          backgroundColor: '#2db22f',
          position: 'absolute',
          zIndex: 10,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          ...getSize(badgeSize).background,
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          position: 'absolute',
          zIndex: 5,
        }}
      />
    </View>
  )
}

export default IsOnline
