import React from 'react'
import { ProgressBar } from 'ui'
import { Base } from './styles'

function Footer({ progress }) {
  return (
    <Base>
      <ProgressBar progress={progress} fillColor="black" />
    </Base>
  )
}

export default Footer
