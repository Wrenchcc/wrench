import React from 'react'
import { FlatList } from 'react-native'
import { Image, GUTTER, SNAP_INTERVAL } from './styles'

function SelectedFiles({ selectedFiles }) {
  return (
    <FlatList
      keyExtractor={item => item.uri}
      data={selectedFiles}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      renderItem={({ item }) => <Image source={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
      style={{
        marginTop: 20,
        marginBottom: 30,
        marginRight: -GUTTER,
        marginLeft: -GUTTER,
      }}
    />
  )
}

export default SelectedFiles
