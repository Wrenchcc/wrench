// @ts-nocheck
import React from 'react'
import { Base, Bounce1, Bounce2, Bounce3 } from './styles'

export default function Loader({ white, className }) {
  return (
    <Base white={white} className={className}>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Base>
  )
}
