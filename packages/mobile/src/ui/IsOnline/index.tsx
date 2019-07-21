import React from 'react'
import { View } from 'react-native'

const getSize = size => ({
  background: {
    borderRadius: size === 'medium' ? 12 : 10,
    bottom: -1,
    height: size === 'medium' ? 12 : 10,
    right: -1,
    width: size === 'medium' ? 12 : 10,
  },
  badge: {
    borderRadius: size === 'medium' ? 8 : 6,
    bottom: 1,
    height: size === 'medium' ? 8 : 6,
    right: 1,
    width: size === 'medium' ? 8 : 6,
  },
})

function IsOnline({ badgeSize = 'medium' }) {
  return (
    <View>
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
          backgroundColor: 'white',
          position: 'absolute',
          zIndex: 5,
        }}
      />
    </View>
  )
}

export default IsOnline
