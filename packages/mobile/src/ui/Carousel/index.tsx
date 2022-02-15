import React, { memo, useState, useCallback } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import Pinchable from 'react-native-pinchable'
import Animated, {
  useAnimatedReaction,
  withTiming,
  withDelay,
  useSharedValue,
  useAnimatedStyle,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { useViewability } from 'navigation'
import { FILE_TYPES } from 'utils/enums'
import Video from 'components/Video'
import { IMAGE_PRIORITY } from 'ui/constants'
import Image from 'ui/Image'
import Pagination from './Pagination'
import { keyExtractor } from 'navigation'
import { Text, Icon, Touchable } from 'ui'
import { close } from 'images'

const { width } = Dimensions.get('window')

const SIZE = width
const GUTTER = 20
const SNAP_INTERVAL = SIZE

const styles = {
  indicator: {
    position: 'absolute',
    right: 0,
    top: 20,
    height: 27,
    borderRadius: 30,
    paddingLeft: 9,
    paddingRight: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    width: 30,
  },
  remove: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  list: {
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
  },
}

const getItemLayout = (_, index: number) => ({
  index,
  length: SIZE,
  offset: SIZE * index,
})

const RemoveItem = ({ children, id, onRemove, files }) => {
  const handleRemove = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onRemove(id)
  }, [id, onRemove])

  // TODO: Translate
  return (
    <Animated.View exiting={FadeOut.delay(0).duration(100)}>
      {files?.edges?.length > 1 && (
        <Animated.View entering={FadeIn.delay(100).duration(200)} style={styles.remove}>
          <Touchable onPress={handleRemove} style={styles.close}>
            <Icon source={close} color="white" width={12} height={12} onPress={handleRemove} />
          </Touchable>
        </Animated.View>
      )}
      {children}
    </Animated.View>
  )
}

function Carousel({ postId, files, onRemove }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollEnabled = files?.edges?.length > 1
  const opacity = useSharedValue(1)
  const context = useViewability()

  useAnimatedReaction(
    () => context?.visiblePostId?.value,
    (visiblePostId) => {
      if (visiblePostId === postId) {
        opacity.value = withDelay(4000, withTiming(0, { duration: 250 }))
      } else {
        opacity.value = withDelay(500, withTiming(1))
      }
    },
    []
  )

  const handleScroll = useCallback(
    ({ nativeEvent }) => {
      const offset = nativeEvent.contentOffset.x
      const index = Math.round(offset / SIZE)
      const node = files?.edges[currentIndex].node

      if (index !== currentIndex) {
        // NOTE: Update visible id
        context?.setVisibleItemId(node.id)
        // NOTE: Set index on post id
        context?.setVisibleIndex(postId, index)

        setCurrentIndex(index)
      }
    },
    [currentIndex, setCurrentIndex]
  )

  const renderType = (item, index) => {
    if (item.node.type === FILE_TYPES.VIDEO) {
      return <Video source={item.node} size={SIZE} id={item.node.id} />
    }

    if (item.node.type === FILE_TYPES.IMAGE) {
      return (
        <Image
          showIndicator
          width={SIZE}
          height={SIZE}
          style={{
            width: SIZE,
            height: SIZE,
          }}
          source={item.node}
          priority={index < 2 ? IMAGE_PRIORITY.HIGH : IMAGE_PRIORITY.LOW}
        />
      )
    }

    return null
  }

  const renderItem = useCallback(
    ({ item, index }) => {
      if (onRemove) {
        return (
          <RemoveItem id={item.node.id} files={files} onRemove={onRemove}>
            {renderType(item, index)}
          </RemoveItem>
        )
      }

      return (
        <Pinchable key={item.node.uri} maximumZoomScale={5}>
          {renderType(item, index)}
        </Pinchable>
      )
    },
    [files]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={{ height: SIZE }}>
      {files?.edges?.length > 1 && !onRemove && (
        <Animated.View style={[styles.indicator, animatedStyle]}>
          <Text fontSize={12} medium color="white">
            {currentIndex + 1}/{files.edges.length}
          </Text>
        </Animated.View>
      )}

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
        style={styles.list}
      />

      {scrollEnabled && <Pagination files={files.edges} currentIndex={currentIndex} />}
    </View>
  )
}

export default memo(Carousel)
