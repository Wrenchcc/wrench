import React, { forwardRef } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import PlatformColor from 'ui/PlatformColor'

export default forwardRef(function Input(
  {
    placeholder,
    noBorder,
    multiline = false,
    placeholderTextColor = PlatformColor.accent,
    large,
    height,
    error,
    color,
    style = {},
    ...props
  }: TextInputProps,
  ref
) {
  return (
    <TextInput
      style={[
        {
          fontSize: large ? 27 : 17,
          height: multiline ? 'auto' : height || 60,
          paddingBottom: multiline ? 20 : 0,
          borderBottomWidth: noBorder ? 0 : 1,
          borderBottomColor: error
            ? PlatformColor.error
            : PlatformColor[color] || PlatformColor.divider,
          color: PlatformColor[color] || PlatformColor.inverse,
        },
        style,
      ]}
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      noBorder={noBorder}
      multiline={multiline}
      keyboardAppearance="dark"
      underlineColorAndroid="transparent"
      {...props}
    />
  )
})
