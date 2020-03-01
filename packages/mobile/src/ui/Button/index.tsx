import React from 'react'
import Text from 'ui/Text'
import { Base } from './styles'

function Button({ children, ...props }) {
  return (
    <Base {...props}>
      <Text medium fontSize={16} color="default">
        {children}
      </Text>
    </Base>
  )
}

export default Button
