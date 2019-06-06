import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'

const transition = <Transition.Change interpolation="easeInOut" />

function ProgressBar({
  backgroundColor = 'rgba(255, 255, 255, 0.4)',
  height = 3,
  borderRadius = 3,
  fillColor = 'white',
  opacity = 1,
  progress = 0,
}) {
  const ref = useRef()
  const [width, setWidth] = useState(progress)

  useEffect(() => {
    setWidth(progress)
    ref.current.animateNextTransition()
  }, [progress, ref])

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{
        opacity,
        backgroundColor,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: `${width}%`,
          height,
          backgroundColor: fillColor,
          borderRadius,
        }}
      />
    </Transitioning.View>
  )
}

export default ProgressBar
