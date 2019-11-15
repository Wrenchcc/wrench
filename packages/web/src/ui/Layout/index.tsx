// @ts-nocheck
import React from 'react'
import { Base, Top, Inner } from './styles'

export default function Layout({ children, column, top }) {
  return (
    <Base>
      <Top>{top}</Top>
      <Inner column={column}>{children}</Inner>
    </Base>
  )
}
