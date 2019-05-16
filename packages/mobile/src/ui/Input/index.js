import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { COLORS } from 'ui/constants'
import { isIphone } from 'utils/platform'
import { Field } from './styles'

const DEFAULT_SELECTION_COLOR = isIphone ? COLORS.DARK : COLORS.WHITE

const Input = memo(function Input({
  placeholder,
  autoFocus,
  noBorder,
  multiline = false,
  selectionColor = DEFAULT_SELECTION_COLOR,
  inputRef,
  ...props
}) {
  return (
    <Field
      autoFocus={autoFocus}
      placeholder={placeholder}
      placeholderTextColor={COLORS.LIGHT_GREY}
      selectionColor={selectionColor}
      noBorder={noBorder}
      multiline={multiline}
      keyboardAppearance="dark"
      underlineColorAndroid="transparent"
      ref={inputRef}
      {...props}
    />
  )
})

Input.propTypes = {
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  noBorder: PropTypes.bool,
  multiline: PropTypes.bool,
  selectionColor: PropTypes.string,
  inputRef: PropTypes.object,
}

export default Input
