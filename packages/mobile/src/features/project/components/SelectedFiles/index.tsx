import React, { useCallback, useRef, useState } from 'react'
import { FlatList, View, Image, Dimensions } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { Video } from 'expo-av'
import { store, useReactiveVar } from 'gql'
import { FILE_TYPES } from 'utils/enums'
import { Touchable, Icon } from 'ui'
import { play, close } from 'images'

const { width } = Dimensions.get('window')

const SIZE = 180
const GUTTER = 20
const BAR_SPACE = GUTTER / 2
const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

const styles = {
  play: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(000, 000, 000, 0.96)',
    position: 'absolute',
    zIndex: 10,
    left: 180 / 2 - 50 / 2,
    right: 0,
    top: 180 / 2 - 50 / 2,
    bottom: 0,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    right: 15,
    top: 5,
    zIndex: 100000,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    left: 2,
  },
  image: {
    width: SIZE,
    height: SIZE,
    marginRight: '${({ last }) => (last ? GUTTER',
  },
  video: {
    width: SIZE,
    height: SIZE,
    marginRight: '${({ last }) => (last ? GUTTER',
  },
  list: {
    marginBottom: 30,
    marginLeft: -GUTTER,
    marginRight: -GUTTER,
    marginTop: 20,
  },
  contentContainerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}

const RemoveItem = ({ children, uri }) => {
  const files = useReactiveVar(store.files.croppedFilesVar)
  const handleRemove = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    store.files.remove(uri)
  }, [uri])

  return (
    <Animated.View exiting={FadeOut.delay(0).duration(100)}>
      {files.length > 1 && (
        <View style={styles.remove}>
          <Icon source={close} color="white" onPress={handleRemove} />
        </View>
      )}
      {children}
    </Animated.View>
  )
}

const PlayableVideo = ({ source }) => {
  const videoRef = useRef(null)
  const [isPaused, setPaused] = useState(true)

  const handlePlay = useCallback(() => {
    if (isPaused) {
      videoRef?.current.playAsync()
    } else {
      videoRef?.current.pauseAsync()
    }

    setPaused(!isPaused)
  }, [isPaused])

  return (
    <Touchable onPress={handlePlay}>
      {isPaused && (
        <View style={styles.play}>
          <Image source={play} style={styles.icon} resizeMode="contain" fadeDuration={0} />
        </View>
      )}
      <Video ref={videoRef} source={source} isLooping resizeMode="cover" style={styles.video} />
    </Touchable>
  )
}

const renderItem = ({ item }) => {
  switch (item.type) {
    case FILE_TYPES.VIDEO: {
      return (
        <RemoveItem uri={item.uri}>
          <PlayableVideo source={item} />
        </RemoveItem>
      )
    }
    default:
      return (
        <RemoveItem uri={item.uri}>
          <Image source={item} style={styles.image} />
        </RemoveItem>
      )
  }
}

const keyExtractor = (item) => item.uri

function SelectedFiles({ selectedFiles }) {
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={selectedFiles}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.list}
    />
  )
}

export default SelectedFiles
