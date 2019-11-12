// @ts-nocheck
import React from 'react'
import { Base, Inner } from './styles'

export default function Layout({ children, column, top }) {
  return (
    <Base>
      {top}
      <Inner column={column}>{children}</Inner>
    </Base>
  )
}
