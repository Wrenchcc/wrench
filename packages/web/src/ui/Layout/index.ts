import React from 'react'
import { Base } from './styles'

export default function Layout({ children, column }) {
  return <Base column={column}>{children}</Base>
}
