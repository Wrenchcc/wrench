// @ts-nocheck
import React from 'react'
import { Base } from './styles'
import handleParse from './handleParse'

const Text = ({ children, ...props }) => (
  <Base parse={handleParse} {...props}>
    {children}
  </Base>
)

export default Text
