import React from 'react'
import { FlatList } from 'react-native'
import { Image, GUTTER, SNAP_INTERVAL } from './styles'

const renderItem = ({ item }) => <Image source={item} />
const keyExtractor = item => item.uri

function SelectedFiles({ selectedFiles }) {
  return (
    <FlatList
      keyExtractor={}
      data={selectedFiles}
      horizontal
      directionalLockEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
      style={{
        marginBottom: 30,
        marginLeft: -GUTTER,
        marginRight: -GUTTER,
        marginTop: 20,
      }}
    />
  )
}

export default SelectedFiles
