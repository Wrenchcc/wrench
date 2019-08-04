import React from 'react'
import { View } from 'react-native'

const KeyboardAccessoryView = ({ children, style = {} }) => (
  <View style={{ ...style, paddingHorizontal: 20 }}>{children}</View>
)

export default KeyboardAccessoryView
