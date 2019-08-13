import React from 'react'
import handleParse from './handleParse'
import { Base } from './styles'

const Text = ({
  children,
  numberOfLines = 0,
  disabled = false,
  onPress,
  lineHeight = null,
  ...props
}) => (
  <Base
    numberOfLines={numberOfLines}
    {...(!disabled && { onPress })}
    {...props}
    parse={handleParse}
    childrenProps={{
      style: { lineHeight },
    }}
  >
    {children}
  </Base>
)

export default Text
