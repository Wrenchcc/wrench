import React from 'react'
import PropTypes from 'prop-types'
import { Base, Text } from './styles'

const Button = ({ children, ...props }) => (
  <Base {...props}>
    <Text color="white" medium>
      {children}
    </Text>
  </Base>
)

Button.propTypes = {
  children: PropTypes.any,
}

export default Button
