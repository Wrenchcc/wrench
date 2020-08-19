import React, { forwardRef } from 'react'
import { TextInputProps } from 'react-native'
import { COLORS } from 'ui/constants'
import { Field, FieldProps } from './styles'

export default forwardRef(function Input(
  {
    placeholder,
    noBorder,
    multiline = false,
    placeholderTextColor = COLORS.LIGHT_GREY,
    ...props
  }: TextInputProps & Partial<FieldProps>,
  ref
) {
  return (
    <Field
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
