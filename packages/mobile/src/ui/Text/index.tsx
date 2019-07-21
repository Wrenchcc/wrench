import React from 'react'
import handleParse from './handleParse'
import { Base } from './styles'

const Text = ({ children, numberOfLines = 0, disabled = false, lineHeight = null, ...props }) => (
  <Base
    numberOfLines={numberOfLines}
    {...props}
    parse={handleParse}
    childrenProps={{ style: { lineHeight } }}
  >
    {children}
  </Base>
)

export default Text
