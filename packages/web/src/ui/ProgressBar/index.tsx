// @ts-nocheck
import React from 'react'
import { Base, Progress } from './styles'

function ProgressBar({ progress }) {
  return (
    <Base>
      <Progress progress={progress} />
    </Base>
  )
}

export default ProgressBar
