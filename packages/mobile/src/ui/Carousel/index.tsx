import React, { memo, useState, useCallback } from 'react'
import { FlatList } from 'react-native'
import Pinchable from 'react-native-pinchable'
import { FILE_TYPES } from 'utils/enums'
import { store } from 'gql'
import Video from 'components/Video'
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
        if (files.edges[index].node.type === FILE_TYPES.VIDEO) {
          store.video.pauseVar(true)
        }
        setCurrentIndex(index)
      }
    },
    [currentIndex, setCurrentIndex]
  )

  const renderType = (item, index) => {
    if (item.node.type === FILE_TYPES.VIDEO) {
      return <Video source={item.node} size={SIZE} />
    }

    if (item.node.type === FILE_TYPES.IMAGE) {
      return (
        <Picture
          showIndicator
          width={SIZE}
          height={SIZE}
          source={item.node}
          priority={index < 2 ? IMAGE_PRIORITY.HIGH : IMAGE_PRIORITY.LOW}
        />
      )
    }

    return null
  }

  const renderItem = useCallback(
    ({ item, index }) => (
      <Pinchable key={item.node.uri} maximumZoomScale={5}>
        {renderType(item, index)}
      </Pinchable>
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
