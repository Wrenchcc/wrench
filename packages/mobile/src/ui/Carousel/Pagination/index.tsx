import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import getOffset from './getOffset'
import { DotBase, Dot, PAGINATION_WIDTH, DOT_SIZE, DOT_SPACE } from './styles'

const paginationScroll = (translateX, count) => ({
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'nowrap',
  minWidth: PAGINATION_WIDTH,
  width: count * (DOT_SIZE + DOT_SPACE),
  justifyContent: count < 5 ? 'center' : 'flex-start',
  transform: [{ translateX }],
})

function Pagination({ files, currentIndex }) {
  const translateX = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(translateX.current, {
      toValue: getOffset(files, currentIndex),
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [currentIndex])

  return (
    <DotBase pointerEvents="none">
      <Animated.View style={paginationScroll(translateX.current, files.length)}>
        {files.map((_, index) => (
          <Dot key={index} active={currentIndex === index} />
        ))}
      </Animated.View>
    </DotBase>
  )
}

export default Pagination
