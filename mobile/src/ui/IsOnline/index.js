import React from 'react'
import { View } from 'react-native'

export default () => (
  <>
    <View
      style={{
        position: 'absolute',
        zIndex: 10,
        right: 1,
        bottom: 1,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: '#05b01e',
      }}
    />
    <View
      style={{
        position: 'absolute',
        zIndex: 5,
        right: -1,
        bottom: -1,
        width: 14,
        height: 14,
        borderRadius: 14,
        backgroundColor: 'white',
      }}
    />
  </>
)
