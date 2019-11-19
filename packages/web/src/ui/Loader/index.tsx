// @ts-nocheck
import React from 'react'
import { Base, Bounce1, Bounce2, Bounce3 } from './styles'

export default function Loader({ white, center = false }) {
  return (
    <Base white={white} center={center}>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Base>
  )
}
