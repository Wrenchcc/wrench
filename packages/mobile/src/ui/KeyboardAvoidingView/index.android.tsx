import React from 'react'
import { View } from 'react-native'

function KeyboardAvoidingView({ children, paddingHorizontal = 20 }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
      }}
    >
      {children}
    </View>
  )
}

export default KeyboardAvoidingView
