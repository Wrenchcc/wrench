import React, { forwardRef } from 'react'
import { COLORS } from 'ui/constants'
import { Field } from './styles'

export default forwardRef(function Input(
  { placeholder, noBorder, multiline = false, placeholderTextColor = COLORS.LIGHT_GREY, ...props },
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
