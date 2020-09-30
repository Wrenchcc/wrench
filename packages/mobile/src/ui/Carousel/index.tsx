import React, { memo, useState, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import Pinchable from 'react-native-pinchable'
import { IMAGE_PRIORITY } from 'ui/constants'
import Pagination from './Pagination'
import { Picture, SIZE, GUTTER } from './styles'
import { keyExtractor } from 'navigation'

const SNAP_INTERVAL = SIZE

const getItemLayout = (_, index: number) => ({
  index,
  length: SIZE,
  offset: SIZE * index,
})

function Carousel({ files }) {
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
      <View key={item.node.uri}>
        <Pinchable maximumZoomScale={5}>
          <Picture
            showIndicator
            width={SIZE}
            height={SIZE}
            source={{ uri: item.node.uri }}
            priority={index < 2 ? IMAGE_PRIORITY.HIGH : IMAGE_PRIORITY.LOW}
          />
        </Pinchable>
      </View>
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
