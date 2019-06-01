import React from 'react'
import { Spring } from 'react-spring/renderprops'
import { Base, Bar } from './styles'

const DEFAULT_BAR_HEIGHT = 3
const DEFAULT_WIDTH = 0

function ProgressBar({
  backgroundColor = 'rgba(255, 255, 255, 0.4)',
  barHeight = DEFAULT_BAR_HEIGHT,
  borderRadius = 3,
  fillColor = 'white',
  opacity = 1,
  progress,
}) {
  return (
    <Base
      opacity={opacity}
      height={barHeight}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      <Spring from={{ width: `${DEFAULT_WIDTH}%` }} to={{ width: `${progress}%` }} native>
        {({ width }) => <Bar width={width} fillColor={fillColor} height={barHeight} />}
      </Spring>
    </Base>
  )
}

export default ProgressBar
