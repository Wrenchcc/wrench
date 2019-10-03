import React, { memo } from 'react'
import { FlatList } from 'react-native'
import Pinchable from 'react-native-pinchable'
import Touchable from 'ui/Touchable'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE, SIZE } from './styles'
import { keyExtractor } from 'navigation'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

const getItemLayout = (_, index) => ({
  index,
  length: SIZE,
  offset: SIZE * index,
})

function Carousel({ onPress, files }) {
  const scrollEnabled = files.edges.length > 1

  const renderItem = ({ item, index }) => (
    <Wrapper key={item.node.uri} first={index === 0} last={index === files.edges.length - 1}>
      <Pinchable maximumZoomScale={5}>
        <Touchable onPress={onPress} activeOpacity={1} nativeHandler>
          <Picture
            width={SIZE}
            height={SIZE}
            source={{ uri: item.node.uri }}
            priority={index < 2 ? IMAGE_PRIORITY.HIGHT : IMAGE_PRIORITY.LOW}
            index={index}
          />
        </Touchable>
      </Pinchable>
    </Wrapper>
  )

  return (
    <FlatList
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={2}
      data={files.edges}
      scrollEnabled={scrollEnabled}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      renderItem={renderItem}
      style={{
        marginLeft: -GUTTER,
        marginRight: -GUTTER,
      }}
    />
  )
}

export default memo(Carousel)
