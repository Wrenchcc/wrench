import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import getOffset from './getOffset'

export const DOT_SIZE = 8
export const DOT_SPACE = 7
export const PAGINATION_WIDTH = 4 * (DOT_SIZE + DOT_SPACE)

const styles = {
  base: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    left: '50%',
    marginLeft: PAGINATION_WIDTH / 2,
    width: PAGINATION_WIDTH,
    overflow: 'hidden',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    borderLeftColor: 'white',
    marginLeft: 3.5,
    marginRight: 3.5,
  },
}

const paginationScroll = (translateX: Animated.AnimatedValue, count: number) => ({
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
    <View pointerEvents="none" style={styles.base}>
      <Animated.View style={paginationScroll(translateX.current, files.length)}>
        {files.map((_, index: number) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? 'white' : 'transparent',
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  )
}

export default Pagination
