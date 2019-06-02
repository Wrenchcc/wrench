import React from 'react'
import { View } from 'react-native'
import { Icon } from 'ui'
import { album as albumIcon } from 'images'

function OpenAlbum({ onPress }) {
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 1,
        left: 20,
        bottom: 20,
        backgroundColor: 'black',
        width: 40,
        height: 40,
        borderRadius: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon source={albumIcon} onPress={onPress} />
    </View>
  )
}

export default OpenAlbum
