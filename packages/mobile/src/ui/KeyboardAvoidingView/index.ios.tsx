import React from 'react'
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native'

function KeyboardAvoidingView({ children, paddingHorizontal = 20, keyboardVerticalOffset = 20 }) {
  return (
    <RNKeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: paddingHorizontal,
        paddingRight: paddingHorizontal,
      }}
    >
      {children}
    </RNKeyboardAvoidingView>
  )
}

export default KeyboardAvoidingView
