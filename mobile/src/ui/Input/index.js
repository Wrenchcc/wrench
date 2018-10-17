import React from 'react'
import PropTypes from 'prop-types'
import { COLORS } from 'ui/constants'
import { Field } from './styles'

function Input({
  placeholder,
  autoFocus,
  noBorder,
  multiline = false,
  selectionColor = COLORS.DARK,
  inputRef,
  ...props
}) {
  return (
    <Field
      autoCorrect={false}
      autoFocus={autoFocus}
      placeholder={placeholder}
      placeholderTextColor={COLORS.LIGHT_GREY}
      selectionColor={selectionColor}
      noBorder={noBorder}
      multiline={multiline}
      keyboardAppearance="dark"
      underlineColorAndroid="transparent"
      {...props}
      ref={inputRef}
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  noBorder: PropTypes.bool,
  multiline: PropTypes.bool,
  selectionColor: PropTypes.string,
  inputRef: PropTypes.func,
}

export default Input
