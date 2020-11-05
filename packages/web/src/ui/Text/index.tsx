// @ts-nocheck
import React from 'react'
import { Base } from './styles'
import handleParse from './handleParse'

const Text = ({ children, onPress, ...props }) => (
  <Base parse={handleParse} {...props} onClick={onPress}>
    {children}
  </Base>
)

export default Text
