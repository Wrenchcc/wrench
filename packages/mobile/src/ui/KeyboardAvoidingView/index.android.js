import React from 'react'
import { View } from 'react-native'

function KeyboardAvoidingView({ children, paddingHorizontal = 20 }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
        paddingBottom: 20,
      }}
    >
      {children}
    </View>
  )
}

export default KeyboardAvoidingView
