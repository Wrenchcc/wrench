import React from 'react'
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native'

function KeyboardAvoidingView({
  children,
  paddingHorizontal = 20,
  keyboardVerticalOffset = 0,
  enabled = true,
}) {
  return (
    <RNKeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={enabled}
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
