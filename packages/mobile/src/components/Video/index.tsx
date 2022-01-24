import React, { useRef, useEffect, useCallback } from 'react'
import { View, Dimensions } from 'react-native'
import { Icon } from 'ui'
import Player from 'react-native-video'
import { Navigation } from 'react-native-navigation'
import { Touchable } from 'ui'
import { useReactiveVar, store } from 'gql'
import { muted, sound, play } from 'images'

const { width } = Dimensions.get('window')

const styles = {
  play: {
    width: 65,
    height: 65,
    backgroundColor: 'rgba(000, 000, 000, 0.96)',
    position: 'absolute',
    zIndex: 10,
    left: width / 2 - 65 / 2,
    right: 0,
    top: width / 2 - 65 / 2,
    bottom: 0,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

function Video({ size, source }) {
  const videoRef = useRef(null)
  const isMuted = useReactiveVar(store.video.isMutedVar)
  const isPaused = useReactiveVar(store.video.pauseVar)

  const pause = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: true })
    store.video.pauseVar(true)
  }, [videoRef])

  const handlePlay = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: !isPaused })
    store.video.pauseVar(!isPaused)
  }, [isPaused])

  useEffect(() => {
    if (isPaused) {
      pause()
    }
  }, [isPaused])

  useEffect(() => {
    const commandListener = Navigation.events().registerCommandListener(() => {
      pause()
    })

    return () => commandListener.remove()
  })

  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(() => {
      pause()
    })

    return () => bottomTabEventListener.remove()
  }, [])

  const handleMute = useCallback(() => {
    store.video.toggleMute()
  }, [])

  return (
    <>
      <Icon
        source={isMuted ? muted : sound}
        onPress={handleMute}
        style={{
          zIndex: 10,
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 30,
          height: 30,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Touchable onPress={handlePlay}>
        {isPaused && (
          <View style={styles.play}>
            <Icon source={play} style={{ left: 2 }} onPress={handlePlay} />
          </View>
        )}
        <Player
          ref={videoRef}
          source={source}
          paused
          repeat
          resizeMode="cover"
          muted={isMuted}
          style={{ width: size, height: size }}
        />
      </Touchable>
    </>
  )
}

export default Video
