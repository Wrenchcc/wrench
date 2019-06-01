import React from 'react'
import { View } from 'react-native'

const getSize = size => ({
  background: {
    right: -1,
    bottom: -1,
    width: size === 'medium' ? 14 : 10,
    height: size === 'medium' ? 14 : 10,
    borderRadius: size === 'medium' ? 14 : 10,
  },
  badge: {
    right: 1,
    bottom: 1,
    width: size === 'medium' ? 10 : 6,
    height: size === 'medium' ? 10 : 6,
    borderRadius: size === 'medium' ? 10 : 6,
  },
})

function IsOnline({ badgeSize = 'medium' }) {
  return (
    <View>
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          zIndex: 10,
          backgroundColor: '#05b01e',
          ...getSize(badgeSize).badge,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          zIndex: 5,
          backgroundColor: 'white',
          ...getSize(badgeSize).background,
        }}
      />
    </View>
  )
}

export default IsOnline
