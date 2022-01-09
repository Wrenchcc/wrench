import React, { useRef } from 'react'
import { Icon } from 'ui'
import { Video as Player } from 'expo-av'
import { useReactiveVar, store } from 'gql'
import { muted, sound } from 'images'

function Video({ size, uri }) {
  const videoRef = useRef(null)
  const isMuted = useReactiveVar(store.video.isMutedVar)

  return (
    <>
      <Player
        ref={videoRef}
        source={{ uri }}
        shouldPlay={false}
        isLooping
        resizeMode="cover"
        isMuted={isMuted}
        style={{ width: size, height: size }}
      />
      <Icon
        source={isMuted ? muted : sound}
        onPress={store.video.toggleMute}
        style={{
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
    </>
  )
}

export default Video
