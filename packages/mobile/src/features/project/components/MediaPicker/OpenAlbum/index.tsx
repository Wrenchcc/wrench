import React from 'react'
import { View } from 'react-native'
import { Icon } from 'ui'
import { album as albumIcon } from 'images'

function OpenAlbum({ onPress }) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 40,
        bottom: 20,
        flex: 1,
        height: 40,
        justifyContent: 'center',
        left: 20,
        position: 'absolute',
        width: 40,
        zIndex: 1,
      }}
    >
      <Icon source={albumIcon} onPress={onPress} />
    </View>
  )
}

export default OpenAlbum
