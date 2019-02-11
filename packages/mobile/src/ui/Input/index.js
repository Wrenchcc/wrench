import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { COLORS } from 'ui/constants'
import { Field } from './styles'

const Input = memo(({
  placeholder,
  autoFocus,
  noBorder,
  multiline = false,
  selectionColor = COLORS.DARK,
  inputRef,
  ...props
}) => (
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
      ref={inputRef}
      {...props}
    />
))

Input.propTypes = {
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  noBorder: PropTypes.bool,
  multiline: PropTypes.bool,
  selectionColor: PropTypes.string,
  inputRef: PropTypes.object,
}

export default Input
