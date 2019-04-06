import React from 'react'
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native'

function KeyboardAvoidingView({ children }) {
  return (
    <RNKeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={20}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {children}
    </RNKeyboardAvoidingView>
  )
}

export default KeyboardAvoidingView
