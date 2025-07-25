import React, { useEffect, useCallback, useState } from 'react'
import { Video as Player } from 'expo-av'
import { Navigation } from 'react-native-navigation'
import Animated, {
  useAnimatedReaction,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedRef,
  withTiming,
} from 'react-native-reanimated'
import { useViewability } from 'navigation'
import { Touchable, Icon, Image } from 'ui'
import { useReactiveVar, store } from 'gql'
import { muted, sound } from 'images'

const styles = {
  mute: {
    width: 30,
    height: 30,
    zIndex: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  muteIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const OPACITY_DURATION = 200

function Video({ size, source, id }) {
  const [showPoster, setShowPoster] = useState(true)
  const videoRef = useAnimatedRef()
  const isPlaying = useSharedValue(false)
  const opacity = useSharedValue(0)
  const isMuted = useReactiveVar(store.video.isMutedVar)
  const context = useViewability()

  const play = useCallback(
    async ({ isMuted }) => {
      // TODO: Check if video is ready
      if (!isPlaying.value) {
        try {
          await videoRef?.current?.loadAsync(source, {
            shouldPlay: true,
            isMuted,
            isLooping: true,
          })

          setShowPoster(false)

          isPlaying.value = true
        } catch (err) {
          isPlaying.value = false
          console.log(err)
        }
      }
    },
    [videoRef]
  )

  const togglePlay = useCallback(() => {
    if (isPlaying.value) {
      videoRef?.current?.pauseAsync()
    } else {
      videoRef?.current?.playAsync()
    }
    isPlaying.value = !isPlaying.value
  }, [isPlaying, isMuted])

  const pause = useCallback(async () => {
    try {
      await videoRef?.current?.unloadAsync()
      setShowPoster(true)
      isPlaying.value = false
    } catch (err) {
      console.log(err)
    }
  }, [videoRef])

  useAnimatedReaction(
    () => context?.visibleItemId?.value,
    (visibleItemId) => {
      if (visibleItemId === id) {
        opacity.value = withTiming(1, { duration: OPACITY_DURATION })
        runOnJS(play)({ isMuted })
      } else {
        opacity.value = withTiming(0, { duration: OPACITY_DURATION })
        runOnJS(pause)()
      }
    },
    [isMuted]
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
      <Animated.View style={[styles.mute, animatedStyle]}>
        <Icon
          source={isMuted ? muted : sound}
          onPress={handleMute}
          color="white"
          style={styles.muteIcon}
        />
      </Animated.View>

      <Touchable onPress={togglePlay}>
        {showPoster && (
          <Image source={source} style={{ width: size, height: size }} width={size} height={size} />
        )}

        <Player
          ref={videoRef}
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
