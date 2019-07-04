import React from 'react'
import { View } from 'react-native'

function KeyboardAvoidingView({ children, paddingHorizontal = 20, keyboardVerticalOffset = 20 }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: keyboardVerticalOffset,
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
      }}
    >
      {children}
    </View>
  )
}

export default KeyboardAvoidingView
