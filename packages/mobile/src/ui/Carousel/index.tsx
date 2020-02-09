import React, { memo, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import Pinchable from 'react-native-pinchable'
import Touchable from 'ui/Touchable'
import { IMAGE_PRIORITY } from 'ui/constants'
import Pagination from './Pagination'
import { Wrapper, Picture, SIZE, GUTTER } from './styles'

const SNAP_INTERVAL = SIZE

const getItemLayout = (_, index) => ({
  index,
  length: SIZE,
  offset: SIZE * index,
})

const keyExtractor = ({ node }) => node.id

function Carousel({ onPress, files }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollEnabled = files.edges.length > 1

  const handleScroll = useCallback(
    ({ nativeEvent }) => {
      const offset = nativeEvent.contentOffset.x
      const index = Math.round(offset / SIZE)

      if (index !== currentIndex) {
        setCurrentIndex(index)
      }
    },
    [currentIndex, setCurrentIndex]
  )

  const renderItem = useCallback(
    ({ item, index }) => (
      <Wrapper key={item.node.uri} first={index === 0} last={index === files.edges.length - 1}>
        <Pinchable maximumZoomScale={5}>
          <Touchable onPress={onPress} activeOpacity={1} nativeHandler>
            <Picture
              showIndicator
              width={SIZE}
              height={SIZE}
              source={{ uri: item.node.uri }}
              priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
              index={index}
            />
          </Touchable>
        </Pinchable>
      </Wrapper>
    ),
    []
  )

  return (
    <>
      <FlatList
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        data={files.edges}
        scrollEnabled={scrollEnabled}
        scrollEventThrottle={200}
        horizontal
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="center"
        onScroll={handleScroll}
        renderItem={renderItem}
        style={{
          marginLeft: -GUTTER,
          marginRight: -GUTTER,
        }}
      />

      {scrollEnabled && <Pagination files={files.edges} currentIndex={currentIndex} />}
    </>
  )
}

export default memo(Carousel)
