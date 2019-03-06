import React from 'react'
import { Base, Bounce1, Bounce2, Bounce3 } from './styles'

export default function Loader({ small }) {
  return (
    <Base small={small}>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Base>
  )
}
