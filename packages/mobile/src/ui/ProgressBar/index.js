import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring/renderprops'
import { Base, Bar } from './styles'

const DEFAULT_BAR_HEIGHT = 3
const DEFAULT_WIDTH = 0

const ProgressBar = memo(function ProgressBar({
  progress,
  opacity,
  backgroundColor,
  borderRadius,
  fillColor,
  barHeight,
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
})

ProgressBar.propTypes = {
  backgroundColor: PropTypes.string,
  barHeight: PropTypes.number,
  borderRadius: PropTypes.number,
  fillColor: PropTypes.string,
  opacity: PropTypes.number,
  progress: PropTypes.number,
}

ProgressBar.defaultProps = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  barHeight: DEFAULT_BAR_HEIGHT,
  borderRadius: 3,
  fillColor: 'white',
  opacity: 1,
}

export default ProgressBar
