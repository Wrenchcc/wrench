// @ts-nocheck
import React from 'react'
import { Base, Top, Inner } from './styles'

export default function Layout({ children, center, column, top, paddingTop = 80 }) {
  return (
    <Base paddingTop={paddingTop}>
      <Top>{top}</Top>
      <Inner column={column} center={center}>
        {children}
      </Inner>
    </Base>
  )
}
