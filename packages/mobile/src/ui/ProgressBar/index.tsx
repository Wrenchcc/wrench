import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useDynamicColor } from 'utils/hooks'

const transition = <Transition.Change interpolation="easeInOut" />

function ProgressBar({
  backgroundColor = 'transparent',
  height = 3,
  borderRadius = 3,
  fillColor = 'inverse',
  opacity = 1,
  progress = 0,
}) {
  const ref = useRef(null)
  const [width, setWidth] = useState(progress)
  const dynamicColor = useDynamicColor(fillColor)

  useEffect(() => {
    setWidth(progress)
    ref.current.animateNextTransition()
  }, [progress, ref, setWidth])

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{
        backgroundColor,
        opacity,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: dynamicColor,
          borderRadius,
          height,
          width: `${width}%`,
        }}
      />
    </Transitioning.View>
  )
}

export default ProgressBar
