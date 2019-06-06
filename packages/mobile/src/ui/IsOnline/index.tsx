import React from 'react'
import { View } from 'react-native'

const getSize = size => ({
  background: {
    borderRadius: size === 'medium' ? 14 : 10,
    bottom: -1,
    height: size === 'medium' ? 14 : 10,
    right: -1,
    width: size === 'medium' ? 14 : 10,
  },
  badge: {
    borderRadius: size === 'medium' ? 10 : 6,
    bottom: 1,
    height: size === 'medium' ? 10 : 6,
    right: 1,
    width: size === 'medium' ? 10 : 6,
  },
})

function IsOnline({ badgeSize = 'medium' }) {
  return (
    <View>
      <View
        pointerEvents="none"
        style={{
          ...getSize(badgeSize).badge,
          backgroundColor: '#05b01e',
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
