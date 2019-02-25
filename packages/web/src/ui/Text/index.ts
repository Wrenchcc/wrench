import React from 'react'
import { Base } from './styles'

const Text = ({ children, ...props }) => <Base {...props}>{children}</Base>

export default Text
