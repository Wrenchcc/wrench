import React, { useRef, useEffect, useCallback } from 'react'
import { Icon } from 'ui'
import Player from 'react-native-video'
import { Touchable } from 'ui'
import { useReactiveVar, store } from 'gql'
import { Navigation } from 'react-native-navigation'
import { useNavigationComponentDidAppear } from 'navigation/hooks'
import { muted, sound } from 'images'

function Video({ size, uri, currentId }) {
  const videoRef = useRef(null)
  const isPlaying = useRef(false)
  const videoIdInViewport = useReactiveVar(store.post.videoIdInViewport)
  const isMuted = useReactiveVar(store.video.isMutedVar)

  const play = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: false })
    isPlaying.current = true
  }, [videoRef, isPlaying])

  const pause = useCallback(() => {
    videoRef?.current.setNativeProps({ paused: true })
    isPlaying.current = false
  }, [videoRef, isPlaying])

  useNavigationComponentDidAppear(() => {
    if (videoIdInViewport === currentId && !isPlaying.current) {
      play()
    } else if (isPlaying.current) {
      pause()
    }
  })

  useEffect(() => {
    if (videoIdInViewport === currentId && !isPlaying.current) {
      play()
    } else if (isPlaying.current) {
      pause()
    }
  }, [videoIdInViewport])

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

  const handlePlay = useCallback(() => {
    if (isPlaying.current) {
      pause()
    } else {
      play()
    }
  }, [videoRef, isPlaying])

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
        <Player
          ref={videoRef}
          source={{ uri }}
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
