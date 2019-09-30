import React, { forwardRef } from 'react'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { Field } from './styles'

const DEFAULT_SELECTION_COLOR = isIphone ? COLORS.DARK : COLORS.WHITE

export default forwardRef(function Input(
  {
    placeholder,
    noBorder,
    multiline = false,
    selectionColor = DEFAULT_SELECTION_COLOR,
    placeholderTextColor = COLORS.LIGHT_GREY,
    ...props
  },
  ref
) {
  return (
    <Field
      ref={ref}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      noBorder={noBorder}
      multiline={multiline}
      keyboardAppearance="dark"
      underlineColorAndroid="transparent"
      {...props}
    />
  )
})
