import React, { useRef, useEffect, useContext, useCallback, useState } from 'react'
import { Video as Player } from 'expo-av'
import { Image } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Animated, {
  useAnimatedReaction,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { ViewabilityItemsContext } from 'navigation'
import { Touchable, Icon } from 'ui'
import { useReactiveVar, store } from 'gql'
import { muted, sound } from 'images'

function Video({ size, source, id }) {
  const videoRef = useRef()
  const isPlaying = useRef(false)
  const opacity = useSharedValue(0)
  const isMuted = useReactiveVar(store.video.isMutedVar)
  const context = useContext(ViewabilityItemsContext)

  const play = useCallback(() => {
    if (!isPlaying.current) {
      // videoRef?.current?.playAsync()

      videoRef?.current?.loadAsync(source, { shouldPlay: true, isMuted, isLooping: true })

      isPlaying.current = true
    }
  }, [isMuted])

  const togglePlay = useCallback(() => {
    if (isPlaying.current) {
      videoRef?.current?.pauseAsync()
    } else {
      videoRef?.current?.playAsync()
    }

    isPlaying.current = !isPlaying.current
  }, [])

  const pause = useCallback(() => {
    if (isPlaying.current) {
      videoRef?.current?.unloadAsync()
    }

    isPlaying.current = false
  }, [videoRef])

  useAnimatedReaction(
    () => context.visibleItemId.value,
    (visibleItemId) => {
      if (visibleItemId === id) {
        opacity.value = withTiming(1, { duration: 200 })
        runOnJS(play)()
      } else {
        opacity.value = withTiming(0, { duration: 200 })
        runOnJS(pause)()
      }
    },
    []
  )

  useEffect(() => {
    const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(() => {
      pause()
    })

    const commandListener = Navigation.events().registerCommandListener(() => {
      pause()
    })

    return () => {
      bottomTabEventListener.remove()
      commandListener.remove()
    }
  }, [])

  const handleMute = useCallback(() => {
    store.video.toggleMute()
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <>
      <Animated.View
        style={[
          { width: 30, height: 30, zIndex: 10, position: 'absolute', bottom: 20, right: 20 },
          animatedStyle,
        ]}
      >
        <Icon
          source={isMuted ? muted : sound}
          onPress={handleMute}
          color="white"
          style={{
            width: 30,
            height: 30,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Animated.View>

      <Touchable onPress={togglePlay}>
        <Player
          ref={videoRef}
          source={source}
          isLooping
          resizeMode="cover"
          isMuted={isMuted}
          style={{ width: size, height: size }}
        />
      </Touchable>
    </>
  )
}

export default Video
