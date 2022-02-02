import React, { useRef, useEffect, useContext, useCallback } from 'react'
import { Video as Player } from 'expo-av'
import { Navigation } from 'react-native-navigation'
import { useAnimatedReaction, runOnJS } from 'react-native-reanimated'
import { ViewabilityItemsContext } from 'navigation'
import { Touchable, Icon } from 'ui'
import { useReactiveVar, store } from 'gql'
import { muted, sound } from 'images'

function Video({ size, source, id }) {
  const videoRef = useRef(null)
  const isPlaying = useRef(false)

  const isMuted = useReactiveVar(store.video.isMutedVar)
  const context = useContext(ViewabilityItemsContext)

  const play = useCallback(() => {
    videoRef?.current?.playAsync()
    isPlaying.current = true
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying.current) {
      pause()
    } else {
      play()
    }
  }, [isPlaying])

  const pause = useCallback(() => {
    videoRef?.current?.pauseAsync()
    isPlaying.current = false
  }, [])

  useAnimatedReaction(
    () => context.visibleItemId.value,
    (visibleItemId) => {
      if (visibleItemId === id) {
        runOnJS(play)()
      } else {
        runOnJS(pause)()
      }
    },
    []
  )

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
        color="white"
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
