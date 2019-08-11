import React from 'react'
import Text from 'ui/Text'
import { Base } from './styles'

function Button({ children, color, ...props }) {
  return (
    <Base {...props}>
      <Text medium color={color} fontSize={15}>
        {children}
      </Text>
    </Base>
  )
}

export default Button
