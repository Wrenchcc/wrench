import React from 'react'
import PropTypes from 'prop-types'
import { Base, Text } from './styles'

const Button = ({ children, color, ...props }) => (
  <Base {...props}>
    <Text medium color={color} fontSize={15}>
      {children}
    </Text>
  </Base>
)

Button.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
}

export default Button
