import React from 'react'
import { View } from 'react-native'

function KeyboardAvoidingView({ children }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      }}
    >
      {children}
    </View>
  )
}

export default KeyboardAvoidingView
