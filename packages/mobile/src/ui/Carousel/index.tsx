import React, { PureComponent } from 'react'
import { FlatList } from 'react-native'
import Pinchable from 'react-native-pinchable'
import Touchable from 'ui/Touchable'
import { IMAGE_PRIORITY } from 'ui/constants'
import { width, Wrapper, Picture, GUTTER, BAR_SPACE, SIZE } from './styles'

const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

function getItemLayout(_, index) {
  return {
    length: SIZE,
    offset: SIZE * index,
    index,
  }
}

function Carousel({ onPress, files }) {
  const scrollEnabled = files.edges.length > 1

  return (
    <FlatList
      keyExtractor={({ node }) => node.id}
      getItemLayout={getItemLayout}
      initialNumToRender={3}
      data={files.edges}
      scrollEnabled={scrollEnabled}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      renderItem={({ item, index }) => (
        <Wrapper key={item.node.uri} first={index === 0} last={index === files.edges.length - 1}>
          <Pinchable maximumZoomScale={5}>
            <Touchable onPress={onPress} activeOpacity={1}>
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
      )}
      style={{
        marginLeft: -GUTTER,
        marginRight: -GUTTER,
      }}
    />
  )
}

export default Carousel
