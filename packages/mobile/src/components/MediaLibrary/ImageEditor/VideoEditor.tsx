import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Image } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { SCREENS } from 'navigation'
import Video from 'react-native-video'
import { Touchable } from 'ui'
import { play } from 'images'
import { CROP_AREA } from '../constants'

const styles = {
  container: {
    width: CROP_AREA,
    height: CROP_AREA,
    overflow: 'hidden',
    backgroundColor: 'rgb(34, 34, 34)',
  },
  play: {
    width: 65,
    height: 65,
    backgroundColor: 'rgba(000, 000, 000, 0.96)',
    position: 'absolute',
    zIndex: 10,
    left: CROP_AREA / 2 - 65 / 2,
    right: 0,
    top: CROP_AREA / 2 - 65 / 2,
    bottom: 0,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: CROP_AREA,
    height: CROP_AREA,
  },
}

const VideoEditor = ({ source }) => {
  const videoRef = useRef(null)
  const [isPaused, setPaused] = useState(true)

  useEffect(() => {
    const commandListener = Navigation.events().registerCommandListener((_, { componentId }) => {
      if (componentId === SCREENS.ADD_MEDIA) {
        videoRef?.current.setNativeProps({ paused: true })

        // TODO: Find a way to set when view is unmounted
        setTimeout(() => {
          setPaused(true)
        }, 1000)
      }
    })

    return () => commandListener.remove()
  })

  const handlePlay = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: !isPaused })
    setPaused(!isPaused)
  }, [isPaused])

  return (
    <View style={styles.container}>
      <Touchable onPress={handlePlay}>
        {isPaused && (
          <View style={styles.play}>
            <Image source={play} style={{ left: 2 }} />
          </View>
        )}
        <Video
          ref={videoRef}
          source={source}
          style={styles.video}
          repeat
          paused
          muted
          resizeMode="cover"
        />
      </Touchable>
    </View>
  )
}

export default VideoEditor
