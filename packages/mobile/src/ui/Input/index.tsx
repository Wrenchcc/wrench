import React, { forwardRef } from 'react'
import { TextInputProps, TextInput } from 'react-native'
import { COLORS } from 'ui/constants'
import PlatformColor from 'ui/PlatformColor'

export default forwardRef(function Input(
  {
    placeholder,
    noBorder,
    multiline = false,
    placeholderTextColor = COLORS.LIGHT_GREY,
    large,
    height,
    error,
    color,
    ...props
  }: TextInputProps,
  ref
) {
  return (
    <TextInput
      style={{
        fontSize: large ? 27 : 17,
        height: multiline ? 'auto' : height || 60,
        paddingBottom: multiline ? 20 : 0,
        borderBottomWidth: noBorder ? 0 : 1,
        borderBottomColor: error
          ? PlatformColor.error
          : PlatformColor[color] || PlatformColor.divider,
        color: PlatformColor[color] || PlatformColor.inverse,
      }}
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
