import React, { useCallback, useRef, useState } from 'react'
import { FlatList, View, Image as RNImage } from 'react-native'
import { FILE_TYPES } from 'utils/enums'
import { Touchable } from 'ui'
import { play } from 'images'
import { Image, Video, GUTTER, SNAP_INTERVAL } from './styles'

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
}

const PlayableVideo = ({ source }) => {
  const videoRef = useRef(null)
  const [isPaused, setPaused] = useState(true)

  const handlePlay = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: !isPaused })
    setPaused(!isPaused)
  }, [isPaused])

  return (
    <Touchable onPress={handlePlay}>
      {isPaused && (
        <View style={styles.play}>
          <RNImage source={play} style={{ widht: 20, height: 20, left: 2 }} resizeMode="contain" />
        </View>
      )}
      <Video ref={videoRef} source={source} repeat paused muted resizeMode="cover" />
    </Touchable>
  )
}

const renderItem = ({ item }) => {
  switch (item.type) {
    case FILE_TYPES.VIDEO: {
      return <PlayableVideo source={item} />
    }
    default:
      return <Image source={item} />
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
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
      style={{
        marginBottom: 30,
        marginLeft: -GUTTER,
        marginRight: -GUTTER,
        marginTop: 20,
      }}
    />
  )
}

export default SelectedFiles
