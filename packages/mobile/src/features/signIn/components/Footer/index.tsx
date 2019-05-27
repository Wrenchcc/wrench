import React from 'react'
import { ProgressBar } from 'ui'
import { Base } from './styles'

type Props = {
  progress: number
}

function Footer({ progress }: Props) {
  return (
    <Base>
      <ProgressBar progress={progress} />
    </Base>
  )
}

export default Footer
