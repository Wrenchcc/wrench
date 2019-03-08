import React from 'react'
import { Base, Bounce1, Bounce2, Bounce3 } from './styles'

export default function Loader({ white }) {
  return (
    <Base white={white}>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Base>
  )
}
