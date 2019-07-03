import React from 'react'
import { View } from 'react-native'

function KeyboardAvoidingView({ children, paddingHorizontal = 20, enabled = true }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: enabled ? 20 : 0,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
      }}
    >
      {children}
    </View>
  )
}

export default KeyboardAvoidingView
